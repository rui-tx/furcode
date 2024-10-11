"use client";

import React from "react";
import DonationCard from "../../_components/DonationCard/DonationCard";
import TotalDonations from "../../_components/TotalDonations/TotalDonations";
import "./styles/index.css";
import DonationsCarousel from "../../_components/DonationsCarousel/DonationsCarousel";
import { useAuth } from "../../context/AuthContext";

const page = () => {
  const { user } = useAuth();
  const donationSettings = [
    {
      imageUrlDonation:
        "https://img.freepik.com/fotos-gratis/kitty-com-parede-monocromatica-atras-dela_23-2148955134.jpg?ga=GA1.1.1751672505.1727189796&semt=ais_hybrid",
      imageAltDonation: "Imagem de donation",
      descriptionDonation:
        "Ajuda a comprar ração para um dia de um cão ou gato",
      value: "5",
      header: "Silver",
    },
    {
      imageUrlDonation:
        "https://img.freepik.com/fotos-gratis/cachorro-de-raca-pura-sendo-fofo-em-um-estudio_23-2149016897.jpg?ga=GA1.2.1751672505.1727189796&semt=ais_hybrid",
      imageAltDonation: "Image de um cão",
      descriptionDonation:
        "Contribui para alimentos e cuidados de saúde básicos.",
      value: "10",
      header: "Gold",
    },
    {
      imageUrlDonation:
        "https://img.freepik.com/fotos-gratis/proximo-de-um-papagaio-adoravel-a-comer_23-2151182866.jpg?ga=GA1.2.1751672505.1727189796&semt=ais_hybrid",
      imageAltDonation: "Periquito",
      descriptionDonation: "Auxilia na vacinação e tratamento de dois animais.",
      value: "15",
      header: "Platinum",
    },
  ];

  return (
    <div>
      <div className="donation-container-total">
        <div className="Total">
          <div className="total-value">
            <h1>Transforme vidas com sua generosidade</h1>
            <p>
              Cada doação é um ato de amor que faz a diferença para nossos
              amigos de quatro patas
            </p>
          </div>
        </div>
        <div className="container-cards">
          {donationSettings.map((donation, index) => (
            <DonationCard
              key={index}
              imageUrlDonation={donation.imageUrlDonation}
              imageAltDonation={donation.imageAltDonation}
              descriptionDonation={donation.descriptionDonation}
              value={donation.value}
              header={donation.header}
            />
          ))}
        </div>

        <div className="container-donation-after-values">
          <TotalDonations />
        </div>
      </div>
      <div className="container-testimonial">
        <h2>Testemunhos</h2>
        <DonationsCarousel />
      </div>
    </div>
  );
};

export default page;
