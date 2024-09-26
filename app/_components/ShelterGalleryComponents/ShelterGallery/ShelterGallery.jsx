"use client";
import { useEffect, useState } from "react";
import "./styles/index.css";
import ShelterGalleryCard from "../ShelterGalleryCard/ShelterGalleryCard";

const ShelterGallery = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchShelters = async () => {
      const result = await fetch("api/shelter");
      const data = await result.json();
      setShelters(data);
      console.log(data);
    };
    fetchShelters();
  }, []);

  return (
    <div className="shelterGallery-container">
      <div className="banner">TEXT DOS SHELTER BONITO</div>
      <div className="shelterGallery-cards">
        {shelters.map((shelter) => (
          <ShelterGalleryCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
};

export default ShelterGallery;
