import { NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";
export async function GET(req) {
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
    const url = `${API_BASE_URL}/adoption-request/all`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to fetch pet" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in pet", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}