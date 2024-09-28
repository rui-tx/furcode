import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get("to");
  const id = searchParams.get("id");

  // Use the built-in FormData parser
  const formData = await req.formData();
  const file = formData.get("file"); // This matches the name in formData.append("file", selectedFile);

  // If you need the file name
  const fileName = file.name;

  // Read the file data as ArrayBuffer
  const fileData = await file.arrayBuffer();
  const base64Data = Buffer.from(fileData).toString("base64"); // Convert to base64
  const md5 = require("crypto")
    .createHash("md5")
    .update(base64Data)
    .digest("hex"); // Calculate MD5 checksum

  // Prepare the payload to send to Spring Boot
  const payload = {
    fileName: fileName,
    fileData: base64Data,
    md5: md5,
  };

  const url = `http://localhost:8080/api/v1/upload/${to}/${id}/image/`;

  const myHeaders = new Headers({
    "Content-Type": "application/json",
  });

  // Send the request to your Spring Boot backend
  const response = await fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Handle error response
    const errorMessage = await response.text();
    return NextResponse.json(
      { error: errorMessage },
      { status: response.status }
    );
  }

  // If response is 201, you can simply return a success message
  return NextResponse.json(
    { message: "Image uploaded successfully" },
    { status: 201 }
  );
}
