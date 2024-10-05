import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1"

export async function POST(request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "").trim();

  console.log(token);
  
  if(!token) {
    return NextResponse.json(
      { error: "No authorization token provided" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/shelter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log(data);
    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to register shelter" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in shelter registration:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}