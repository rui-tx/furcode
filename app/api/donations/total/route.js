import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8080";

    const response = await fetch(`${backendUrl}/api/v1/donations/total`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch total donations from backend");
    }

    const totalDonations = await response.text(); // Use text() instead of json() as the response is a plain number
    return NextResponse.json(
      { total: parseFloat(totalDonations) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching total donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch total donations" },
      { status: 500 }
    );
  }
}
