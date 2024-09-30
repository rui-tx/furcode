"use client";
import { useCallback, useEffect, useState } from "react";
import "./styles/index.css";
import ShelterGalleryCard from "../ShelterGalleryCard/ShelterGalleryCard";
import ShelterBanner from "../ShelterBanner/ShelterBanner";

const ShelterGallery = () => {
  const [shelters, setShelters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sheltersPerPage = 10;

  const fetchShelters = useCallback(async () => {
    try {
      const ENDPOINT = "api/shelter";
      const URL_CONFIGURED = `${ENDPOINT}?limit=${sheltersPerPage}&page=${currentPage}&order=DESC`;
      const response = await fetch(URL_CONFIGURED);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShelters((prevShelters) => [...prevShelters, ...data]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching shelters:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    const sentinel = document.querySelector('.sentinel');
    if (sentinel) {
      intersectionObserver.observe(sentinel);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="shelterGallery-container">
      <div className="ShelterGallery-banner">
        <ShelterBanner></ShelterBanner>
      </div>
      <div className="shelterGallery-cards">
        {shelters.map((shelter) => (
          <ShelterGalleryCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
      <div className="sentinel"></div>
    </div>
  );
};

export default ShelterGallery;
