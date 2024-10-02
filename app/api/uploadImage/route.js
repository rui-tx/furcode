import { NextResponse } from "next/server";
import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

function calculateMD5(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

async function uploadImage(url, payload, token) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  try {
    const { searchParams } = new URL(req.url);
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    const to = searchParams.get("to");
    const id = searchParams.get("id");
    const isCover = searchParams.get("cover");
    const extension = searchParams.get("extension");

    if (!to || !id) {
      return NextResponse.json(
        { error: "Missing required parameters 'to' and/or 'id'" },
        { status: 400 }
      );
    }
    const fileName = isCover ? "cover" + "." + extension : file.name;
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileData = await file.arrayBuffer();
    const base64Data = Buffer.from(fileData).toString("base64");
    const md5 = calculateMD5(base64Data);

    const payload = {
      fileName,
      fileData: base64Data,
      md5,
    };

    const url = `${API_BASE_URL}/upload/${to}/${id}/image/`;
    await uploadImage(url, payload, token);

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
