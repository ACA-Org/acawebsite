// app/api/linkedin/posts/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID; // Your organization's LinkedIn ID

    if (!accessToken || !organizationId) {
      return NextResponse.json(
        { error: "Missing LinkedIn credentials or organization ID" },
        { status: 500 }
      );
    }

    // Create the organization URN
    const orgUrn = `urn:li:organization:${organizationId}`;
    const encodedOrgUrn = encodeURIComponent(orgUrn);

    // Fetch posts using the current Posts API
    const response = await fetch(
      `https://api.linkedin.com/rest/posts?author=${encodedOrgUrn}&q=author&count=10&sortBy=LAST_MODIFIED`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
          "LinkedIn-Version": "202501", // Use the latest version
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("LinkedIn API Error:", response.status, errorData);
      return NextResponse.json(
        { error: `LinkedIn API error: ${response.status} - ${errorData}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform the data to a more usable format
    const posts =
      data.elements?.map((post) => ({
        id: post.id,
        commentary: post.commentary || "",
        createdAt: new Date(post.createdAt || 0).toISOString(),
        publishedAt: new Date(post.publishedAt || 0).toISOString(),
        lastModifiedAt: new Date(post.lastModifiedAt || 0).toISOString(),
        author: post.author,
        lifecycleState: post.lifecycleState,
        visibility: post.visibility,
        isReshareDisabledByAuthor: post.isReshareDisabledByAuthor,
        distribution: post.distribution,
        content: post.content || {},
        lifecycleStateInfo: post.lifecycleStateInfo || {},
        // Include ad context if it's a sponsored post
        adContext: post.adContext || null,
        // Include reshare context if it's a reshare
        reshareContext: post.reshareContext || null,
      })) || [];

    return NextResponse.json({
      success: true,
      posts: posts,
      total: data.paging?.count || 0,
      paging: data.paging || {},
    });
  } catch (error) {
    console.error("Error fetching LinkedIn posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn posts" },
      { status: 500 }
    );
  }
}

// Additional endpoint to get a specific post by URN
export async function POST(request) {
  try {
    const { postUrn } = await request.json();

    if (!postUrn) {
      return NextResponse.json(
        { error: "Post URN is required" },
        { status: 400 }
      );
    }

    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing LinkedIn access token" },
        { status: 500 }
      );
    }

    const encodedPostUrn = encodeURIComponent(postUrn);

    const response = await fetch(
      `https://api.linkedin.com/rest/posts/${encodedPostUrn}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
          "LinkedIn-Version": "202501",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("LinkedIn API Error:", response.status, errorData);
      return NextResponse.json(
        { error: `LinkedIn API error: ${response.status}` },
        { status: response.status }
      );
    }

    const post = await response.json();

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        commentary: post.commentary || "",
        createdAt: new Date(post.createdAt || 0).toISOString(),
        publishedAt: new Date(post.publishedAt || 0).toISOString(),
        lastModifiedAt: new Date(post.lastModifiedAt || 0).toISOString(),
        author: post.author,
        lifecycleState: post.lifecycleState,
        visibility: post.visibility,
        isReshareDisabledByAuthor: post.isReshareDisabledByAuthor,
        distribution: post.distribution,
        content: post.content || {},
        lifecycleStateInfo: post.lifecycleStateInfo || {},
        adContext: post.adContext || null,
        reshareContext: post.reshareContext || null,
      },
    });
  } catch (error) {
    console.error("Error fetching LinkedIn post:", error);
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn post" },
      { status: 500 }
    );
  }
}
