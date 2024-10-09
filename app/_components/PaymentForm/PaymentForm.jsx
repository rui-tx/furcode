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

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/donation-sucess",
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        // Save the donation to the database
        try {
          const response = await fetch("/api/donations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...donationDetails,
              paymentIntentId: result.paymentIntent.id,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to save donation");
          }
          // Redirect to success page or show success message
          window.location.href = "/donation-sucess";
        } catch (error) {
          setError(
            "Payment successful, but failed to save donation. Please contact support."
          );
        }
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment}>
      <PaymentElement />
      <button disabled={!stripe || loading}>Submit Payment</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default PaymentForm;
