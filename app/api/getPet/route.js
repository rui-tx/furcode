import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the 'id' query parameter

  const url = `https://apifurcode.ducknexus.com/api/v1/pet/${id}`;

  console.log(url);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    console.log(response);
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Pet not found" }, { status: 404 });
      }
      throw new Error("Failed to fetch pet ");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pet " },
      { status: 500 }
    );
  }
}
