import { NextRequest, NextResponse } from "next/server";
import {
  getLocationsCollection,
  invalidateLocationsCache,
} from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Location } from "@/app/locations/data/types";
import { isLocationsAdmin } from "@/lib/auth-helpers";

// GET single location by ID - Public endpoint
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collection = await getLocationsCollection();
    const location = await collection.findOne({ _id: new ObjectId(id) });

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}

// PUT - Update location (requires auth)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authorization
  const isAuthorized = await isLocationsAdmin();
  if (!isAuthorized) {
    return NextResponse.json(
      {
        error: "Unauthorized - You do not have permission to update locations",
      },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const body: Partial<Location> = await request.json();

    const collection = await getLocationsCollection();

    // Remove _id from update if present
    const { _id, ...updateData } = body as any;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Invalidate cache
    invalidateLocationsCache();

    return NextResponse.json({ success: true, modified: result.modifiedCount });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}

// DELETE location (requires auth)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authorization
  const isAuthorized = await isLocationsAdmin();
  if (!isAuthorized) {
    return NextResponse.json(
      {
        error: "Unauthorized - You do not have permission to delete locations",
      },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;
    const collection = await getLocationsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Invalidate cache
    invalidateLocationsCache();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 }
    );
  }
}
