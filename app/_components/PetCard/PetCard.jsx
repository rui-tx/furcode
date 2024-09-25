import React from "react";
import { FaHeart as Heart } from "react-icons/fa";
import { FaInfoCircle as Info } from "react-icons/fa";
import "./styles/index.css";

const PetCard = () => {
  return (
    <>
      <div className="petcard">
        <div className="petcard-image-div">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
            alt="dog"
          />
        </div>
        <div className="petcard-content">
          <div className="petcard-description"></div>
          <div className="petcard-text">
            <span>
              <Info size={16} /> Name:
            </span>
            <span>
              <Info size={16} /> Shelter:
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