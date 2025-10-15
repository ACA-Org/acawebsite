import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });

    return NextResponse.json({
      status: "healthy",
      message: "MongoDB connection successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("MongoDB health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        message: "MongoDB connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
