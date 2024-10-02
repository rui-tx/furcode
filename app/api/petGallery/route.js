import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  try {
    const response = await fetch(`${API_BASE_URL}/pet/all?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: data.message || "Failed to fetch pets" }, { status: response.status });
    }
  } catch (error) {
    console.error("Error in pet gallery API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}