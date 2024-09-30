import React, { useEffect, useState } from "react";
import { FaHeart as Heart } from "react-icons/fa";
import { FaInfoCircle as Info } from "react-icons/fa";
import "./styles/index.css";

const PetCard = ({ image, name, breed }) => {
  return (
    <>
      <div className="petcard">
        <div className="petcard-image-div">
          <img src={image} alt="dog" />
        </div>
        <div className="petcard-content">
          <div className="petcard-description"></div>
          <div className="petcard-text">
            <span className="info-pet-card">
              <Info size={16} /> Nome: {name}
            </span>
            <span className="info-pet-card">
              <Info size={16} /> Raça: {breed}
            </span>
            <div className="book-heart">
              <Heart className="heart-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetCard;
