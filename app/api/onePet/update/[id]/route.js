import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    const token = req.headers
      .get("Authorization")
      ?.replace("Bearer ", "")
      .trim();
    if (!token) {
      return NextResponse.json(
        { error: "No authorization token provided" },
        { status: 401 }
      );
    }
    const petData = await req.json();
    console.log("Received pet data:", petData);

    const url = `${API_BASE_URL}/pet/update/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });

    const data = await response.json();
    console.log("API response:", data);

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to fetch" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in adoption request:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
