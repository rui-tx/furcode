// import Stripe from "stripe";
import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, currency = "eur" } = await req.json();

    // Temporarily disabled Stripe paymentIntent creation for build purposes
    /*
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      metadata: {
        integration_check: "accept_a_payment",
      },
    });
    */

    // Mock response to replace Stripe's payment intent for now
    const paymentIntent = {
      client_secret: "mock_client_secret",
      id: "mock_payment_intent_id",
    };

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error in create-payment-intent API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
