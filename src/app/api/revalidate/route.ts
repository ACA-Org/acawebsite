import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { PrismicWebhookPayload } from "./types";
import { createClient } from "@/prismicio";
import { getParentPageUids } from "@/app/actions/getParentPageUids";

type DirectRevalidatePayload = {
  tags: string[];
};

export async function POST(req: NextRequest) {
  console.log("[Revalidate] Received revalidation request");
  const revalidated: any[] = [];
  const authHeader = req.headers.get("authorization");

  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    console.error(
      "[Revalidate] Authentication failed - Invalid or missing API secret"
    );
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("[Revalidate] Authentication successful");
  const body = await req.json();

  if ("tags" in body && Array.isArray(body.tags)) {
    const payload = body as DirectRevalidatePayload;
    console.log(
      `[Revalidate] Processing direct tag revalidation request for ${payload.tags.length} tags`
    );

    payload.tags.forEach((tag) => {
      console.log(`[Revalidate] Revalidating tag: ${tag}`);
      revalidateTag(tag);
      revalidated.push({
        tag,
        revalidatedAt: new Date().toISOString(),
      });
    });

    console.log(
      `[Revalidate] Successfully revalidated ${revalidated.length} tags`
    );
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      data: revalidated,
    });
  }

  console.log("[Revalidate] Processing Prismic webhook payload");
  const data = body as PrismicWebhookPayload;
  const client = createClient();

  console.log(
    `[Revalidate] Fetching documents from Prismic: ${data.documents.join(", ")}`
  );
  const result = await client.getByIDs(data.documents);

  if (result.total_results_size > 0) {
    const { results } = result;
    console.log(`[Revalidate] Found ${results.length} documents to process`);

    for (const i of results) {
      console.log(
        `[Revalidate] Processing document type: ${i.type}, uid: ${i.uid}`
      );

      switch (i.type) {
        case "tierTwoPage":
        case "tierThreePage":
        case "tierFourPage": {
          console.log(
            `[Revalidate] Processing tier page: ${i.type}, uid: ${i.uid}`
          );
          // Revalidate the current page
          revalidateTag(i.uid);
          revalidated.push({
            type: i.type,
            uid: i.uid,
            revalidatedAt: new Date().toISOString(),
          });

          // Get and revalidate all parent pages
          console.log(`[Revalidate] Fetching parent pages for ${i.uid}`);
          const parentUids = await getParentPageUids(i.uid, i.type);
          console.log(
            `[Revalidate] Found ${parentUids.length} parent pages to revalidate`
          );

          for (const parentUid of parentUids) {
            console.log(`[Revalidate] Revalidating parent page: ${parentUid}`);
            revalidateTag(parentUid);
            revalidated.push({
              type: "parent",
              uid: parentUid,
              revalidatedAt: new Date().toISOString(),
            });
          }
          break;
        }
        case "tierOnePage":
          console.log(`[Revalidate] Revalidating tier one page: ${i.uid}`);
          revalidateTag(i.uid);
          revalidated.push({
            type: i.type,
            uid: i.uid,
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "contactPage":
          console.log("[Revalidate] Revalidating contact page");
          revalidateTag("contactPage");
          revalidated.push({
            type: "contactPage",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "footer":
          console.log("[Revalidate] Revalidating footer");
          revalidateTag("footer");
          revalidated.push({
            type: "footer",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "header":
          console.log("[Revalidate] Revalidating header");
          revalidateTag("header");
          revalidated.push({
            type: "header",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "homepage":
        case "nextConferenceSection":
          console.log("[Revalidate] Revalidating homepage");
          revalidateTag("homepage");
          revalidated.push({
            type: "homepage",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        default:
          console.warn(`[Revalidate] Unhandled document type: ${i.type}`);
          return;
      }
    }
  } else {
    console.log("[Revalidate] No documents found to process");
  }

  console.log("[Revalidate] Revalidation summary:", revalidated);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    data: revalidated,
  });
}
