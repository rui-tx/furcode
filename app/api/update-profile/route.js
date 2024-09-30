import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const profileData = await request.json();
    console.log("Received profile data:", profileData);

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        updatedProfile: profileData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error updating profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only accepts POST requests" },
    { status: 405 }
  );
}
