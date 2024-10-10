import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

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

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");

        const response = await fetch(
          `/api/person/${donationDetails.userId}/donate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              total: donationDetails.amount,
              currency: "eur",
              date: new Date().toISOString(),
              shelterId: donationDetails.shelterId,
              personId: donationDetails.userId,
              paymentIntentId: result.paymentIntent.id,
              paymentMethod: result.paymentIntent.payment_method,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to save donation: ${response.statusText}`);
        }

        const donationData = await response.json();
        console.log("Donation saved:", donationData);

        // Handle successful donation (e.g., show a success message, redirect)
        window.location.href = `/donation-success?payment_intent=${result.paymentIntent.id}`;
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        Submit Payment
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default PaymentForm;
