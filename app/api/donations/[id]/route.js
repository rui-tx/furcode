import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function POST(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const response = await fetch(`${API_BASE_URL}/person/${id}/donate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: data.message || "Failed to fetch pets" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in pet gallery API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
