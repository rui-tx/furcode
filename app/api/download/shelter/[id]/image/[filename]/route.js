import { Client } from "minio";
import { NextResponse } from "next/server";

const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "changeme",
  secretKey: "changeme2x",
});

export async function GET(request, { params }) {
  const { id, filename } = params;
  const bucketName = "furcode";
  const objectName = `shelter/${id}/image/${filename}`;

  try {
    const dataStream = await minioClient.getObject(bucketName, objectName);
    const chunks = [];
    for await (const chunk of dataStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const base64Data = buffer.toString("base64");

    // Determine content type (you might want to implement a more robust method)
    const contentType =
      filename.endsWith(".jpg") || filename.endsWith(".jpeg")
        ? "image/jpeg"
        : filename.endsWith(".png")
        ? "image/png"
        : "application/octet-stream";

    return new NextResponse(
      JSON.stringify({ base64: base64Data, contentType }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching image from MinIO:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Failed to fetch image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
