import { NextResponse } from "next/server";
const CACHE_DURATION = 24 * 60 * 60 * 1000;
import * as cheerio from "cheerio";

export interface LinkedInPost {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  author: string;
  postUrl: string;
  images: string[];
}

interface CacheData {
  posts: LinkedInPost[];
  timestamp: number;
  expiresAt: number;
}

// In-memory cache (consider using Redis for production)
let cache: CacheData | null = null;

// Your organization's LinkedIn page URL
const LINKEDIN_COMPANY_URL =
  process.env.LINKEDIN_COMPANY_URL ||
  "https://www.linkedin.com/company/your-company";

async function scrapeLinkedInPosts(): Promise<LinkedInPost[]> {
  try {
    // Note: LinkedIn heavily protects against scraping. This is a basic example.
    // For production, consider using LinkedIn's official API instead.
    const response = await fetch(LINKEDIN_COMPANY_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch LinkedIn page: ${response.status}`);
    }

    const html = await response.text();

    const $ = cheerio.load(html);
    const posts: LinkedInPost[] = [];

    // Target the updates section and iterate through each post
    $(".updates__list > li").each((index, element) => {
      if (posts.length >= 25) return false; // Stop after 25 posts

      const $post = $(element);

      // Extract post URL from the overlay link
      const postUrl =
        $post.find(".main-feed-card__overlay-link").attr("href") || "";

      // Extract activity URN for unique ID
      const activityUrn =
        $post.find("[data-activity-urn]").attr("data-activity-urn") || "";
      const postId =
        activityUrn.replace("urn:li:activity:", "") ||
        `post-${index}-${Date.now()}`;

      // Extract author/company name
      const author =
        $post
          .find('[data-tracking-control-name*="feed-actor-name"]')
          .text()
          .trim() || $post.find(".link-styled").first().text().trim();

      // Extract timestamp
      const timeElement = $post.find("time").first();
      const timestamp =
        timeElement.attr("datetime") ||
        timeElement.text().trim() ||
        new Date().toISOString();

      // Extract post content/text (this might be in various places)
      let content = "";

      // Try different selectors for post content
      const contentSelectors = [
        ".feed-shared-text",
        ".feed-shared-update-v2__description",
        ".update-components-text",
        '[data-test-id*="text"]',
      ];

      for (const selector of contentSelectors) {
        content = $post.find(selector).text().trim();
        if (content) break;
      }

      // If no text content, check for image alt text or other descriptive content
      if (!content) {
        const imgAlt = $post.find("img").attr("alt");
        if (
          imgAlt &&
          imgAlt !== "No alternative text description for this image"
        ) {
          content = imgAlt;
        }
      }

      // Extract engagement metrics - these are typically not visible in the guest view
      // but we'll try to find them if they exist
      const socialCounts = $post.find('[class*="social-counts"]');
      let likes = 0,
        comments = 0,
        shares = 0;

      socialCounts.each((_, countElement) => {
        const text = $(countElement).text().toLowerCase();
        const number = parseInt(text.replace(/\D/g, "")) || 0;

        if (text.includes("reaction") || text.includes("like")) {
          likes = number;
        } else if (text.includes("comment")) {
          comments = number;
        } else if (text.includes("share") || text.includes("repost")) {
          shares = number;
        }
      });

      // Extract images from the post - updated to target correct elements
      const images: string[] = [];

      // Target the specific feed images content structure
      $post
        .find('[data-test-id="feed-images-content__list-item"]')
        .each((imgIndex, imgContainer) => {
          const $container = $(imgContainer);

          // Look for img element within the container
          const $img = $container.find("img");

          if ($img.length > 0) {
            // Try data-delayed-url first (LinkedIn's lazy loading), then src
            const imgSrc = $img.attr("data-delayed-url") || $img.attr("src");
            const imgAlt = $img.attr("alt");

            // Add image if it has a valid URL and is not a company logo
            if (
              imgSrc &&
              imgSrc.startsWith("http") &&
              !imgSrc.includes("company-logo") &&
              !imgSrc.includes("static.licdn") &&
              imgAlt !==
                "View organization page for American Correctional Association"
            ) {
              images.push(imgSrc);
            }
          }
        });

      // Fallback: if no images found with the specific selector, try the original approach
      if (images.length === 0) {
        $post.find("img").each((imgIndex, imgElement) => {
          const $img = $(imgElement);
          const imgSrc = $img.attr("data-delayed-url") || $img.attr("src");
          const imgAlt = $img.attr("alt");

          // Add any image that's not a company logo
          if (
            imgSrc &&
            imgSrc.startsWith("http") &&
            !imgSrc.includes("company-logo") &&
            !imgSrc.includes("static.licdn") &&
            imgAlt !==
              "View organization page for American Correctional Association"
          ) {
            images.push(imgSrc);
          }
        });
      }

      // Only add posts that have some meaningful content or identifiable data
      if (author || content || postUrl) {
        posts.push({
          id: postId,
          content: content || "No text content available",
          timestamp,
          likes,
          comments,
          shares,
          author: author || "Unknown",
          postUrl: postUrl.startsWith("http")
            ? postUrl
            : `https://linkedin.com${postUrl}`,
          images,
        });
      }
    });

    return posts;
  } catch (error) {
    console.error("Error scraping LinkedIn posts:", error);
    throw new Error("Failed to scrape LinkedIn posts");
  }
}

function isCacheValid(): boolean {
  if (!cache) return false;
  return Date.now() < cache.expiresAt;
}

async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  // Check if cache is valid
  if (isCacheValid() && cache) {
    return cache.posts;
  }

  // Fetch fresh data
  const posts = await scrapeLinkedInPosts();

  // Update cache
  cache = {
    posts,
    timestamp: Date.now(),
    expiresAt: Date.now() + CACHE_DURATION,
  };

  return posts;
}

export async function GET() {
  try {
    const posts = await getLinkedInPosts();

    return NextResponse.json({
      success: true,
      data: posts,
      cached: isCacheValid() && cache !== null,
      cacheExpiry: cache?.expiresAt,
      count: posts.length,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch LinkedIn posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: Add a POST endpoint to manually refresh the cache
export async function POST() {
  try {
    // Clear existing cache
    cache = null;

    // Fetch fresh data
    const posts = await getLinkedInPosts();

    return NextResponse.json({
      success: true,
      message: "Cache refreshed successfully",
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error("Cache refresh error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh cache",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

