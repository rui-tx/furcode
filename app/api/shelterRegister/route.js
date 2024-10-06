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

  const userId = request.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const response = await fetch(
      `${API_BASE_URL}/person/${userId}/create-shelter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Include the shelter ID in the response
      return NextResponse.json({ ...data, userId }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: data.message || "Failed to create shelter" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in shelter creation:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
