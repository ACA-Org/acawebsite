import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { PrismicWebhookPayload } from "./types";
import { createClient } from "@/prismicio";

type DirectRevalidatePayload = {
  tags: string[];
};

export async function POST(req: NextRequest) {
  const revalidated: any[] = [];
  const authHeader = req.headers.get("authorization");

  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.json();

  if ("tags" in body && Array.isArray(body.tags)) {
    const payload = body as DirectRevalidatePayload;
    payload.tags.forEach((tag) => {
      revalidateTag(tag);
      revalidated.push({
        tag,
        revalidatedAt: new Date().toISOString(),
      });
    });

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      data: revalidated,
    });
  }

  const data = body as PrismicWebhookPayload;
  const client = createClient();

  const result = await client.getByIDs(data.documents);

  if (result.total_results_size > 0) {
    const { results } = result;

    results.forEach((i) => {
      switch (i.type) {
        case "tierOnePage":
        case "tierTwoPage":
        case "tierThreePage":
        case "tierFourPage":
          revalidateTag(i.uid);
          revalidated.push({
            type: i.type,
            uid: i.uid,
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "contactPage":
          revalidateTag("contactPage");
          revalidated.push({
            type: "contactPage",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "footer":
          revalidateTag("footer");
          revalidated.push({
            type: "footer",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "header":
          revalidateTag("header");
          revalidated.push({
            type: "header",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        case "homepage":
        case "nextConferenceSection":
          revalidateTag("homepage");
          revalidated.push({
            type: "homepage",
            revalidatedAt: new Date().toISOString(),
          });
          break;
        default:
          // Ignore other types
          return;
      }
    });
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    data: revalidated,
  });
}
