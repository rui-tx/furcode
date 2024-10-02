import { NextResponse } from "next/server";

export async function GET() {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL + "/dogs/all-breeds-names";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cat breeds");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cat breeds" },
      { status: 500 }
    );
  }
}
