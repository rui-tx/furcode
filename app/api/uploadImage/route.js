import { NextResponse } from "next/server";
import crypto from "crypto";
import { unstable_noStore as noStore } from "next/cache";

const API_BASE_URL = "http://localhost:8080/api/v1";

function calculateMD5(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

async function uploadImage(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response;
}

export async function POST(req) {
  noStore();

  try {
    const { searchParams } = new URL(req.url);
    const to = searchParams.get("to");
    const id = searchParams.get("id");

    if (!to || !id) {
      return NextResponse.json(
        { error: "Missing required parameters 'to' and/or 'id'" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name;
    const fileData = await file.arrayBuffer();
    const base64Data = Buffer.from(fileData).toString("base64");
    const md5 = calculateMD5(base64Data);

    const payload = {
      fileName,
      fileData: base64Data,
      md5,
    };

    const url = `${API_BASE_URL}/upload/${to}/${id}/image/`;
    await uploadImage(url, payload);

    return NextResponse.json(
      { message: "Image uploaded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
