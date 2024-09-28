import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the 'id' query parameter

  const url = `http://localhost:8080/api/v1/pet/${id}`;

  console.log(url);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Pet not found" }, { status: 404 });
      }
      throw new Error("Failed to fetch pet ");
    }
    const petData = await response.json();

    // Fetch cover image
    const coverImageResponse = await fetch(
      `http://localhost:8080/api/v1/download/pet/${id}/image/cover/base64`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (!coverImageResponse.ok) {
      console.error("Failed to fetch cover image");
    }
    const coverImageBase64 = await coverImageResponse.text();

    const listImagesResponse = await fetch(
      `http://localhost:8080/api/v1/download/pet/${id}/image/`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    if (!listImagesResponse.ok) {
      console.error("Failed to fetch list images");
    }
    const listImages = await listImagesResponse.json();

    const newData = {
      ...petData,
      coverImage: coverImageBase64,
      imageList: listImages,
    };

    return NextResponse.json(newData);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pet " },
      { status: 500 }
    );
  }
}
