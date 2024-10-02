import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

async function fetchWithErrorHandling(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Not Found");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Pet ID is required" }, { status: 400 });
  }

  try {
    const [petData, coverImage, imageList] = await Promise.all([
      fetchWithErrorHandling(`${API_BASE_URL}/pet/${id}`).then((res) =>
        res.json()
      ),
      fetchWithErrorHandling(
        `${API_BASE_URL}/download/pet/${id}/image/cover/base64`
      ).then((res) => res.text()),
      fetchWithErrorHandling(`${API_BASE_URL}/download/pet/${id}/image/`).then(
        (res) => res.json()
      ),
    ]);

    return NextResponse.json({
      ...petData,
      coverImage,
      imageList,
    });
  } catch (error) {
    console.error("Fetch error:", error);

    if (error.message === "Not Found") {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to fetch pet data" },
      { status: 500 }
    );
  }
}
