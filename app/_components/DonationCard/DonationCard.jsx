"use client";
import "./styles/index.css";
import Modal from "../Modal/Modal";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import ShelterSelectFilter from "../ShelterSelectFilter/ShelterSelectFilter";

const DonationCard = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [idShelterSelected, setIdShelterSelected] = useState(null);
  const userId = localStorage.getItem("user");

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

  const handleDonation = () => {
    if (!user || !user.id) return;
    setLoading(true);
    const fetchDonation = async () => {
      try {
        const response = await fetch(`/api/donations/${user?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationBody),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Donation data:", data);
      } catch (e) {
        console.error("Failed to fetch donation data:", e);
        setError("Failed to fetch donation data: " + e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDonation();
  };

  const modalContent = (
    <div className="total-modal-donation-total">
      <form className="total-modal-donation" onSubmit={handleSubmit}>
        <div className="container-modal-dropdown-donations">
          <ShelterSelectFilter onSelectedShelterId={handleShelterId} />
        </div>
        <p>Clique no botão abaixo para confirmar sua doação.</p>
        <button
          type="submit"
          className="donation-form-button"
          onClick={handleDonation}
        >
          Confirmar Doação
        </button>
      </form>
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
