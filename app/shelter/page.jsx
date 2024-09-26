import React from "react";
import "./styles/index.css";
import ShelterGallery from "../_components/ShelterGalleryComponents/ShelterGallery/ShelterGallery";

const page = () => {
  return (
    <div className="shelter-container">
      <div className="shelter-content">
        <ShelterGallery />
      </div>
    </div>
  );
};

export default page;
