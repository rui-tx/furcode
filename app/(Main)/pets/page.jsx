"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import GalleryPetCard from "../../_components/GalleryPetCard/GalleryPetCard";
import GalleryUpperText from "../../_components/GalleryUpperText/GalleryUpperText";
import "./styles/index.css";
import SideBarPets from "../../_components/SideBarPets/SideBarPets";

const Page = () => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const petsPerPage = 10;

  const fetchPets = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/petGallery?page=${currentPage}&limit=${petsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.length === 0) {
        setHasMore(false);
        console.log("No more pets to load. End of data reached.");
      } else {
        setPets((prevPets) => {
          const newPets = data.filter(
            (newPet) => !prevPets.some((pet) => pet.id === newPet.id)
          );
          if (newPets.length === 0) {
            console.log(
              "All pets from this page have been loaded. No new data."
            );
            setHasMore(false);
            return prevPets;
          }
          return [...prevPets, ...newPets];
        });
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError("Failed to load pets. Please try again later.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchPets();
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.querySelector(".sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [fetchPets, loading, hasMore]);

  const handleClick = (id) => {
    router.push(`/pets/${id}`);
  };

  return (
    <div className="container-pets">
      <SideBarPets />
      <div className="gallery-text-container">
        <GalleryUpperText />
        {error && <p className="error-message">{error}</p>}
        <div className="pets-gallery">
          {pets.map((pet) => (
            <GalleryPetCard
              key={pet.id}
              name={pet.name}
              image={pet.image}
              description={pet.description}
              age={pet.age}
              breed={pet.breed}
              onClick={() => handleClick(pet.id)}
            />
          ))}
        </div>
        {hasMore && <div className="sentinel" style={{ height: "20px" }}></div>}
        {loading && <p>Loading more pets...</p>}
        {!hasMore && <p>No more pets to load.</p>}
      </div>
    </div>
  );
};

export default Page;
