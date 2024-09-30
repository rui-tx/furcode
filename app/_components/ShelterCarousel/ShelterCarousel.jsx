"use client";
import "./styles/index.css";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const ShelterCarousel = ({ ...props }) => {
  const [sliderShelterSettings, setSliderShelterSettings] = useState(null);
  const { shelterImages } = props;

  useEffect(() => {
    const loadStyles = async () => {
      await import("slick-carousel/slick/slick.css");
      await import("slick-carousel/slick/slick-theme.css");
    };
    loadStyles();
    setSliderShelterSettings({
      dots: true,
      infinite: true,
      speed: 12000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
    });
  }, []);

  if (!sliderShelterSettings) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container-one-shelter-total">
      <div className="one-shelter-images-carousel">
        <Slider
          {...sliderShelterSettings}
          className="shelter-images-slider custom-slider"
        >
          {shelterImages.map((imageUrl, index) => (
            <div key={index} className="one-shelter-image-slide">
              <img
                src={imageUrl}
                alt={`Imagem da associação ${index + 1}`}
                className="image-shelter-wrapper"
              />
            </div>
          ))}
        </Slider>
      </div>
      </div>
  );
};

export default ShelterCarousel;
