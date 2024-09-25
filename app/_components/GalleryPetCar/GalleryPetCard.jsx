import React from "react";
import "./styles/index.css";
const GalleryPetCard = ({ name, image, description, age, breed }) => {
  return (
    <div className="pet-card">
      <img src={image} alt={name} className="pet-image" />
      <div className="pet-info">
        <h3>{name}</h3>
        <p>
          {breed} • {age} anos
        </p>
        <p className="pet-description">{description}</p>
        <button className="adopt-button">Adotar</button>
      </div>
    </div>
  );
};

export default GalleryPetCard;
