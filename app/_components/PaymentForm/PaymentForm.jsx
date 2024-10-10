import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = ({ clientSecret, donationDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      // Payment succeeded
      await handlePaymentSuccess(result.paymentIntent);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      console.log("Payment Intent:", paymentIntent);
      const requestBody = {
        paymentIntentId: paymentIntent.id,
        shelterId: donationDetails.shelterId,
      };
      console.log("Request body:", JSON.stringify(requestBody));

      const response = await fetch(`/api/donations/${donationDetails.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Donation saved:", data);
      // Handle successful donation (e.g., show success message, redirect)
    } catch (error) {
      console.error("Failed to save donation:", error);
      setError(
        "Payment successful, but failed to save donation. Please contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default PaymentForm;
