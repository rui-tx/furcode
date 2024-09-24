"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroImage from "../HeroImage/HeroeImage";
import "./styles/index.css";
import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const HeroCarousel = () => {
  const [sliderSettings, setSliderSettings] = useState(null);
  const heroContent = [
    {
      imageUrl:
        "https://vspca.org/wp-content/uploads/2020/05/donate-button-600x300.png",
      link: "/donation",
      alt: "Donate",
    },
    {
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/5c457bfbf2e6b156c933f36d/1679832607906-54Y5BY5E1CJ1NHB3BFEV/what+we+do.png?format=1000w",
      link: "/pets",
      alt: "Pets",
    },
    {
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/041/770/405/non_2x/dog-care-volunteer-facebook-cover-template-editor_template.jpeg",
      link: "/help",
      alt: "Help",
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
    <div className="hero-carousel-container">
      <Slider {...sliderSettings} className="hero-slider">
        {heroContent.map((content, index) => (
          <div key={index} className="hero-slide-item">
            <Link href={content.link}>
              <HeroImage imageUrl={content.imageUrl} alt={content.alt} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
