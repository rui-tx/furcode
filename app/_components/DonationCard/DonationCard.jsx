"use client";
import "./styles/index.css";
import Modal from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import ShelterSelectFilter from "../ShelterSelectFilter/ShelterSelectFilter";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const DonationCard = ({ ...props }) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const [clientSecret, setClientSecret] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const { isLoggedIn, logout } = useAuth();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [idShelterSelected, setIdShelterSelected] = useState(null);

  const {
    value,
    header,
    line1,
    line2,
    line3,
    imageUrlDonation,
    imageAltDonation,
    descriptionDonation,
  } = props;

  useEffect(() => {
    // This will only run on the client-side
    setUserId(localStorage.getItem("user"));
  }, []);

  const donationBody = {
    total: value,
    date: new Date().toISOString(),
    shelterId: idShelterSelected,
    personId: user?.id,
  };

  const handleWantToDonate = () => {
    setIsModalOpen(true);
    showModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showModal(false);
  };

  const showModal = (show) => {
    setIsModalOpen(show);
  };

  const handleClickToLogin = () => {
    router.push("/login");
  };

  const handleShelterId = (shelterId) => {
    setIdShelterSelected(shelterId);
  };

  const handleDonation = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: value,
          currency: "eur",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (e) {
      console.error("Failed to create PaymentIntent:", e);
      setError("Failed to create PaymentIntent: " + e.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/donation-success",
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setError(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");

        // Call your backend to save the donation
        try {
          const response = await fetch(`/api/v1/person/${user.id}/donate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              total: value,
              currency: "eur",
              shelterId: idShelterSelected,
              paymentIntentId: result.paymentIntent.id,
              paymentMethod: result.paymentIntent.payment_method,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to save donation");
          }

          const donationData = await response.json();
          console.log("Donation saved:", donationData);
          // Handle successful donation (e.g., show a success message, redirect)
        } catch (error) {
          console.error("Error saving donation:", error);
          setError("Failed to save donation. Please contact support.");
        }
      }
    }

    setLoading(false);
  };
  const modalContent = (
    <div className="total-modal-donation-total">
      <form className="total-modal-donation" onSubmit={handleSubmit}>
        <div className="container-modal-dropdown-donations">
          <ShelterSelectFilter onSelectedShelterId={handleShelterId} />
        </div>
        <p>Clique no botão abaixo para confirmar sua doação.</p>
        <button
          type="button"
          className="donation-form-button"
          onClick={handleDonation}
        >
          Confirmar Doação
        </button>
      </form>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            clientSecret={clientSecret}
            donationDetails={{
              userId: user.id,
              amount: value,
              shelterId: idShelterSelected,
            }}
          />
        </Elements>
      )}
    </div>
  );

  const modalContent2 = (
    <div className="container-adoption-modal">
      <h2 className="container-adoption-modal-title">
        Para doar, é necessário estar logado. Clique no botão abaixo para
        continuar.
      </h2>
      <button
        className="container-adoption-modal-button"
        onClick={handleClickToLogin}
      >
        Login
      </button>
    </div>
  );

  return (
    <div className="donation-card">
      <div className="container-donation-image-card">
        <img src={imageUrlDonation} alt={imageAltDonation} />

        <div className="container-description-donation">
          <p>{descriptionDonation}</p>
        </div>
      </div>
      <div className="pricing-table gprice-single">
        <div className="head">
          <h4 className="title-donation">{header}</h4>
        </div>

        <div className="content">
          <div className="price">
            <h1>{value}€</h1>
          </div>
          <ul>
            {line1 && <li>{line1}</li>}
            {line2 && <li>{line2}</li>}
            {line3 && <li>{line3}</li>}
          </ul>
          <div className="sign-up">
            <button
              href="#"
              className="btn bordered radius"
              onClick={handleWantToDonate}
            >
              Donate
            </button>
          </div>

          <Modal
            open={isModalOpen}
            title="Doação"
            content={isLoggedIn ? modalContent : modalContent2}
            onCancel={() => showModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
