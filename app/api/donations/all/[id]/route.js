import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function GET(req, { params }) {
  const { id } = params;
  const token = req.headers.get("Authorization")?.replace("Bearer ", "").trim();
  
  console.log("Request received for shelter ID:", id);
  console.log("API_BASE_URL:", API_BASE_URL);

  if (!token) {
    console.log("No authorization token provided");
    return NextResponse.json(
      { error: "No authorization token provided" },
      { status: 401 }
    );
  }

  try {

    const url = `${API_BASE_URL}/shelter/${id}/get-all-donations`;
    console.log("Calling API URL:", url);
    
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("Request headers:", headers);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    console.log("API response status:", response.status);
    
    const data = await response.json();
    console.log("API response data:", data);

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      console.log("API request failed:", response.status, data.message);
      return NextResponse.json(
        { message: data.message || "Failed to fetch donations" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in donations API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}