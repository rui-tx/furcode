import React from "react";
import "./styles/index.css";

function ShelterSocialMedia({ shelterSocialMedia }) {
  return (
    <div className="one-shelter-social-media-buttons">
      <p>Contacte-nos:</p>
      <span>{shelterSocialMedia}</span>
    </div>
  );
}

export default ShelterSocialMedia;
