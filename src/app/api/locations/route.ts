import { NextRequest, NextResponse } from "next/server";
import {
  getCachedLocations,
  getLocationsCollection,
  invalidateLocationsCache,
} from "@/lib/mongodb";
import { Location } from "@/app/locations/data/types";
import { isLocationsAdmin } from "@/lib/auth-helpers";

// GET all locations (cached) - Public endpoint
export async function GET() {
  try {
    const locations = await getCachedLocations();
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

// POST - Create new location (requires auth)
export async function POST(request: NextRequest) {
  // Check authorization
  const isAuthorized = await isLocationsAdmin();
  if (!isAuthorized) {
    return NextResponse.json(
      {
        error: "Unauthorized - You do not have permission to create locations",
      },
      { status: 403 }
    );
  }

  try {
    const body: Location = await request.json();

    // Validate required fields
    if (!body.companyName || !body.facilityType || !body.companyCodeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const collection = await getLocationsCollection();
    const result = await collection.insertOne(body);

    // Invalidate cache
    invalidateLocationsCache();

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
