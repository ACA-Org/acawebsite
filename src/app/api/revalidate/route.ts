import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { PrismicWebhookPayload } from "./types";

export async function GET(req: NextRequest) {
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await req.json()) as PrismicWebhookPayload;

  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
