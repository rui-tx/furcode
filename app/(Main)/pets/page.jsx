"use client";
import React, { useEffect, useState, useCallback } from "react";
import GalleryPetCard from "../../_components/GalleryPetCard/GalleryPetCard";
import GalleryUpperText from "../../_components/GalleryUpperText/GalleryUpperText";
import "./styles/index.css";
import SideBarPets from "../../_components/SideBarPets/SideBarPets";

const Page = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const petsPerPage = 10;

  const fetchPets = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const ENDPOINT = "api/petsGallery";
      const URL_CONFIGURED = `${ENDPOINT}?limit=${petsPerPage}&page=${currentPage}&order=DESC`;
      const response = await fetch(URL_CONFIGURED);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
        console.log("Não há mais pets para carregar. Fim dos dados alcançado.");
      } else {
        setPets((prevPets) => {
          const newPets = data.filter(
            (newPet) => !prevPets.some((pet) => pet.id === newPet.id)
          );
          if (newPets.length === 0) {
            console.log("Todos os pets desta página já foram carregados. Não há novos dados.");
            setHasMore(false);
            return prevPets;
          }
          return [...prevPets, ...newPets];
        });
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fetchPets();
      }
    });
    const sentinel = document.querySelector('.sentinel');
    if (sentinel) {
      intersectionObserver.observe(sentinel);
    }
    return () => {
      intersectionObserver.disconnect();
    };
  }, [fetchPets]);

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
        {hasMore && <div className="sentinel"></div>}
        {!hasMore && <p>Não há mais pets para carregar.</p>}
      </div>
    </div>
  );
};

export default Page;