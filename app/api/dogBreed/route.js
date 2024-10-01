import { NextResponse } from "next/server";

export async function GET() {
  const url = `http://localhost:8080/api/dogs/all-breeds-names`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(url, {
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
