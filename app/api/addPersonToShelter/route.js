import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function POST(request) {
  const token = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "")
    .trim();

  if (!token) {
    return NextResponse.json(
      { error: "No authorization token provided" },
      { status: 401 }
    );
  }

  try {
    const { personId, shelterId } = await request.json();

    if (!personId || !shelterId) {
      return NextResponse.json(
        { error: "Both personId and shelterId are required" },
        { status: 400 }
      );
    }

    const addToShelterResponse = await fetch(
      `${API_BASE_URL}/person/add-person-to-shelter/${personId}/${shelterId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!addToShelterResponse.ok) {
      const errorData = await addToShelterResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to add person to shelter" },
        { status: addToShelterResponse.status }
      );
    }

    const addToShelterResult = await addToShelterResponse.json();

    return NextResponse.json(
      {
        message: "Person added to shelter successfully",
        shelterAssignment: addToShelterResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding person to shelter:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
