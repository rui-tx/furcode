import { NextResponse } from "next/server";
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";
 export async function GET(request) {
   const token = request.headers
     .get("Authorization")
     ?.replace("Bearer ", "")
     .trim();
   if (!token) {
     return NextResponse.json(
       { error: "No authorization token provided" },
       { status: 401 }
     );
   }
   try {
     const response = await fetch(`${API_BASE_URL}/person/all`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
     const data = await response.json();
     if (response.ok) {
       return NextResponse.json(data, { status: 200 });
     } else {
       return NextResponse.json(
         { error: data.message || "Failed to fetch persons" },
         { status: response.status }
       );
     }
   } catch (error) {
     console.error("Error fetching persons:", error);
     return NextResponse.json(
       { error: "Internal server error", details: error.message },
       { status: 500 }
     );
   }
 }