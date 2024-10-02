import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

async function loginUser(url, email, password) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
}

export async function POST(req) {
  console.log(API_BASE_URL);
  const { email, password } = await req.json();

  /****    APENAS PARA TESTE DEPOIS APAGAR    ****/
  if (email === "teste@teste.com" && password === "teste") {
    return NextResponse.json(
      { status: 200 }
    );
  }
  /****    FIM DO TESTE    ****/

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing required fields 'email' and/or 'password'" },
      { status: 400 }
    );
  }

  try {
    const url = `${API_BASE_URL}/auth/login`;
    const response = await loginUser(url, email, password);

    if (response.status === 400) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Invalid email or password" },
        { status: 400 }
      );
    }

    if (response.ok) {
      const data = await response.json();
      console.log("Login response data:", data); // This will log the entire response

      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: response.status }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
}
