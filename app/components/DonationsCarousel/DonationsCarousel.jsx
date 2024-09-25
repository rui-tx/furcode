"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "./styles/index.css";
import TestimonialDonationsCards from "../TestimonialDonationsCards/TestimonialDonationsCards";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const DonationsCarousel = () => {
  const [sliderSettings, setSliderSettings] = useState(null);

  const testimonialDonationsCards = [
    {
      description:
        "Doar para o abrigo me fez sentir que estou realmente fazendo a diferença. Ver os animais felizes e saudáveis é uma recompensa incrível!",
      author: "- Maria S., doadora mensal",
    },
    {
      description:
        "Graças às doações, pude adotar meu melhor amigo. O trabalho que vocês fazem é inspirador!",
      author: "- João P., adotante",
    },
    {
      description:
        "Voluntariar no abrigo mudou minha vida. As doações nos permitem dar aos animais o cuidado que eles merecem. É incrível ver o impacto que fazemos juntos!",
      author: "- Ana R., voluntária",
    },
  ];

  useEffect(() => {
    const loadStyles = async () => {
      await import("slick-carousel/slick/slick.css");
      await import("slick-carousel/slick/slick-theme.css");
    };
    loadStyles();
    setSliderSettings({
      dots: true,
      infinite: true,
      speed: 12000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    });
  }, []);

  if (!sliderSettings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="donations-carousel">
      <Slider {...sliderSettings} className="donations-slider custom-slider">
        
        {testimonialDonationsCards.map((testimonialDonationsCard, index) => (
          <div key={index} className="slide-wrapper">
            <TestimonialDonationsCards
              description={testimonialDonationsCard.description}
              author={testimonialDonationsCard.author}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DonationsCarousel;
