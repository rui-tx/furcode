// app/api/update-profile/[id]/route.js
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/person/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { message: "Profile updated successfully", user: data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to update profile", error: data },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
