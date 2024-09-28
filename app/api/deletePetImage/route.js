import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8080/api/v1";

async function deletePetImage(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Image not found");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const fileName = searchParams.get("fileName");

  if (!id || !fileName) {
    return NextResponse.json(
      { error: "Missing required parameters 'id' and/or 'fileName'" },
      { status: 400 }
    );
  }

  try {
    const url = `${API_BASE_URL}/pet/${id}/image/${fileName}`;
    await deletePetImage(url);

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);

    if (error.message === "Image not found") {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
