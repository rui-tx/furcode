import React from "react";
import "./styles/index.css";

const HeroImage = ({ imageUrl, alt }) => {
  return (
    <div className="hero-image">
      <div className="hero-image-container">
        <img src={imageUrl} alt={alt} className="hero-actual-image" />
      </div>
    </div>
  );
};

export default HeroImage;
