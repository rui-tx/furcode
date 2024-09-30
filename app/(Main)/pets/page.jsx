"use client";
import React, { useEffect, useState, useCallback } from "react";
import GalleryPetCard from "../../_components/GalleryPetCard/GalleryPetCard";
import GalleryUpperText from "../../_components/GalleryUpperText/GalleryUpperText";
import "./styles/index.css";
import SideBarPets from "../../_components/SideBarPets/SideBarPets";

const Page = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 10;

  const fetchPets = useCallback(async () => {
    try {
      const ENDPOINT = "api/petsGallery";
      const URL_CONFIGURED = `${ENDPOINT}?limit=${petsPerPage}&page=${currentPage}&order=DESC`;
      const response = await fetch(URL_CONFIGURED);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPets((prevPets) => [...prevPets, ...data]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

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
    <div className="container-pets">
      <SideBarPets />
      <div className="gallery-text-container">
        <GalleryUpperText />
        <div className="pets-gallery">
          {pets.map((pet) => (
            <GalleryPetCard
              key={pet.id}
              name={pet.name}
              image={pet.image}
              description={pet.description}
              age={pet.age}
              breed={pet.breed}
            />
          ))}
        </div>
        <div className="sentinel"></div>
      </div>
    </div>
  );
};

export default Page;
