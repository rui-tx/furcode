import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { id } = params;
  const donationData = await request.json();

  console.log("Received donation data:", donationData);

  // TODO: Implement actual database saving logic here
  // For now, we'll just log it and return a mock response

  try {
    // Simulate database operation
    const savedDonation = {
      id: Math.floor(Math.random() * 1000), // Example ID
      ...donationData,
      createdAt: new Date().toISOString(),
    };

    console.log("Saved donation:", savedDonation);

    return NextResponse.json(savedDonation, { status: 201 });
  } catch (error) {
    console.error("Error saving donation:", error);
    return NextResponse.json(
      { error: "Failed to save donation" },
      { status: 500 }
    );
  }
}
