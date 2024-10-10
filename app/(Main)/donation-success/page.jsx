"use client";

import { useSearchParams } from "next/navigation";

export default function DonationSuccess() {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");

  return (
    <div>
      <h1>Thank you for your donation!</h1>
      <p>Your payment was successful.</p>
      <p>Payment Intent ID: {payment_intent}</p>
    </div>
  );
}
