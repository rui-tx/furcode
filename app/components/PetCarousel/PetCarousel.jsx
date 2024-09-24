"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PetCard from "../PetCard/PetCard";
import "./styles/index.css"; // Changed to a regular import

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const PetCarousel = () => {
  const [sliderSettings, setSliderSettings] = useState(null);

  useEffect(() => {
    const loadStyles = async () => {
      await import("slick-carousel/slick/slick.css");
      await import("slick-carousel/slick/slick-theme.css");
    };
    loadStyles();

    setSliderSettings({
      dots: true,
      infinite: true,
      speed: 900,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }, []);

  const pets = Array(10).fill(null);

  if (!sliderSettings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel-container">
      <Slider {...sliderSettings} className="slider">
        {pets.map((_, index) => (
          <div key={index} className="slide-item">
            <PetCard />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PetCarousel;
