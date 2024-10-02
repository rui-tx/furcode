import { headers } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

async function fetchWithErrorHandling(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Not Found");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

// POST request to create a new pet
export async function POST(req) {
  try {
    const petData = await req.json();
    if (!petData.name || !petData.shelterId) {
      return NextResponse.json(
        { error: "Name, and shelterId are required" },
        { status: 400 }
      );
    }

    if (!petData.breedName) {
      return NextResponse.json(
        { error: "Breed name is required" },
        { status: 400 }
      );
    }

    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "No authorization token provided" },
        { status: 401 }
      );
    }

    const createBreedBody = {
      name: petData.breedName,
      species: "DOG",
    };

    // get breed type id
    const newPetTypeIdResponse = await fetchWithErrorHandling(
      `${API_BASE_URL}/breed/create-breed`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createBreedBody),
      }
    );

    const newPetTypeId = await newPetTypeIdResponse.json();
    if (!newPetTypeIdResponse) {
      return NextResponse.json(
        { error: "Failed to create breed" },
        { status: 500 }
      );
    }
    petData.petTypeId = newPetTypeId.id;

    const response = await fetchWithErrorHandling(`${API_BASE_URL}/pet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });

    const createdPet = await response.json();

    //Upload cover image
    // const imageUploadResponse = await fetch(
    //   `http://localhost:3000/api/uploadImage?to=pet&id=${createdPet.id}&cover=true&base64=true`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(petData.coverImage),
    //   }
    // );

    // const imageUploadData = await imageUploadResponse.json();
    // if (!imageUploadResponse.ok) {
    //   return NextResponse.json(
    //     { error: "Failed to upload cover image" },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json(createdPet, { status: 201 });
  } catch (error) {
    console.error("Error creating pet:", error);
    return NextResponse.json(
      { error: "Failed to create new pet" },
      { status: 500 }
    );
  }
}
