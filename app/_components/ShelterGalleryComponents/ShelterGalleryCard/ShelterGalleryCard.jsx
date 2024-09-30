import React from "react";
import "./style/index.css";

const ShelterGalleryCard = ({ shelter }) => {
  return (
    <div className="shelterGallery-card">
      <div className="shelterGallery-imageDiv">
        <img
          src={shelter.image}
          alt={shelter.name}
          className="shelterGallery-image"
        />
      </div>
      <div className="shelterGallery-info">
        <h3>{shelter.name}</h3>

        <p>
          <strong>Morada:</strong> {shelter.address1}
        </p>
      </div>
    </div>
  );
};

export default ShelterGalleryCard;
