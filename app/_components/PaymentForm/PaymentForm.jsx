import React from "react";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const PaymentForm = ({ clientSecret }) => {
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
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        // Here you can call your backend to save the donation
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
