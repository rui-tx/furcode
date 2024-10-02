import React from "react";
import "./styles/index.css";
const GalleryPetCard = ({ name, image, description, age, breed, onClick }) => {
  return (
    <div className="pet-card">
      <div className="pet-card-container-photo">
        <img src={image} alt={name} className="pet-image" />
      </div>
      <div className="pet-info">
        <h3>{name}</h3>
        <p>
          {breed} • {age} anos
        </p>
        <p className="pet-description">{description}</p>
        <button className="pet-card-adopt-button" onClick={onClick}>
          Adotar
        </button>
      </div>
    </div>
  );
};

export default GalleryPetCard;
