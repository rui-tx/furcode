// pages/api/save-donation.js
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function POST(req) {
  try {
    const donationData = await req.json();
    const personId = donationData.personId; // Ensure this is included in the frontend request

    // Update the endpoint to match your backend structure
    const response = await fetch(`${API_BASE_URL}/person/${personId}/donate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Donation saved successfully:", data);
      return NextResponse.json(data, { status: 200 });
    } else {
      console.error("Failed to save donation:", data);
      return NextResponse.json(
        { message: data.message || "Failed to save donation" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in save donation API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
