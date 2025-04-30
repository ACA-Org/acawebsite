import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});
const BATCH_SIZE = 50; // Process 50 addresses at a time

export async function POST(request: Request) {
  try {
    const { addresses, batchIndex = 0 } = await request.json();

    // Get the current batch of addresses
    const startIndex = batchIndex * BATCH_SIZE;
    const endIndex = startIndex + BATCH_SIZE;
    const currentBatch = addresses.slice(startIndex, endIndex);

    // If no addresses in this batch, return empty results
    if (currentBatch.length === 0) {
      return NextResponse.json({
        results: [],
        hasMore: false,
        nextBatchIndex: null,
      });
    }

    const geocodedResults = await Promise.all(
      currentBatch.map(async (address: string) => {
        try {
          const response = await client.geocode({
            params: {
              address,
              key: process.env.GOOGLE_MAPS_API_KEY!,
            },
          });

          if (response.data.results[0]) {
            const { lat, lng } = response.data.results[0].geometry.location;
            return {
              address,
              position: { lat, lng },
              success: true,
            };
          }
          return {
            address,
            success: false,
            error: "No results found",
          };
        } catch (_error) {
          return {
            address,
            success: false,
            error: "Geocoding failed",
          };
        }
      })
    );

    return NextResponse.json({
      results: geocodedResults,
      hasMore: endIndex < addresses.length,
      nextBatchIndex: endIndex < addresses.length ? batchIndex + 1 : null,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to process geocoding request" },
      { status: 500 }
    );
  }
}
