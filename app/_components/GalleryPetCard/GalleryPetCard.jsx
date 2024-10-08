import React, { useState, useEffect } from "react";
import "./styles/index.css";

const GalleryPetCard = ({ name, image, description, age, breed, onClick }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (image && image.startsWith("data:")) {
      setImageUrl(image);
    } else {
      setImageError(true);
    }
  }, [image]);

  const handleImageError = () => {
    console.error(`Failed to load image for pet: ${name}`);
    setImageError(true);
  };

  return (
    <div className="pet-card">
      <div className="pet-card-container-photo">
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="pet-image"
            onError={handleImageError}
          />
        ) : (
          <div className="pet-image-placeholder">No Image Available</div>
        )}
      </div>
      <div className="pet-info-gallery">
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
