import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/v1";

export async function POST(req, { params }) {
  const { id } = params; // This is the user ID

  try {
    const { paymentIntentId, shelterId } = await req.json();
    console.log("Request body:", { paymentIntentId, shelterId, userId: id });

    if (!paymentIntentId || !shelterId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Temporarily disable Stripe paymentIntent retrieval for build
    /*
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("Stripe PaymentIntent:", paymentIntent);
    */

    // Fake paymentIntent for temporary usage
    const paymentIntent = { amount: 1000 }; // Representando 10.00 (em centavos)

    // Prepare donation data
    const donationData = {
      total: parseFloat((paymentIntent.amount / 100).toFixed(2)), // Convert cents to dollars/euros and ensure it's a number
      date: new Date().toISOString(), // Use current date
      shelterId: parseInt(shelterId), // Ensure it's a number
      personId: parseInt(id), // Ensure it's a number
    };
    console.log("Donation data to be sent:", donationData);

    // Send donation data to your API
    const response = await fetch(`${API_BASE_URL}/person/${id}/donate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    });

    const responseText = await response.text();
    console.log("API response status:", response.status);
    console.log("API response text:", responseText);

    let jsonData;
    try {
      jsonData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse API response:", parseError);
      return NextResponse.json(
        {
          message: "Invalid JSON in API response",
          responseText: responseText,
          status: response.status,
        },
        { status: 500 }
      );
    }

    if (response.ok) {
      return NextResponse.json(jsonData, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message: jsonData.message || "Failed to save donation",
          responseData: jsonData,
          status: response.status,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error in donation API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.toString() },
      { status: 500 }
    );
  }
}
