import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the 'id' query parameter
  const fileName = searchParams.get("fileName"); // Get the 'fileName' query parameter

  const url = `http://localhost:8080/api/v1/pet/${id}/image/${fileName}`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      throw new Error("Failed to delete image");
    }

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 204 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
