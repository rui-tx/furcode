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

  const fetchPetImages = async (petId) => {
    console.log(`Fetching image for pet ${petId}`);
    try {
      const response = await fetch(
        `/api/download/pet/${petId}/image/cover.jpg`
      );
      console.log(`Response status for pet ${petId}: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const { base64, contentType } = data;
      console.log(`Received ${contentType} image for pet ${petId}`);

      
      const imageUrl = `data:${contentType};base64,${base64}`;
      console.log(
        `Image URL for pet ${petId}:`,
        imageUrl.substring(0, 50) + "..."
      ); 
      return imageUrl;
    } catch (error) {
      console.error(`Error fetching image for pet ${petId}:`, error);
      return "/path/to/fallback/image.jpg"; 
    }
  };
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
      const adoptedPets = data.filter((pet) => pet.isAdopted === false);

      
      const petsWithImages = await Promise.all(
        adoptedPets.map(async (pet) => {
          const image = await fetchPetImages(pet.id);
          return { ...pet, image };
        })
      );

      if (petsWithImages.length === 0) {
        setHasMore(false);
        console.log("No more pets to load. End of data reached.");
      } else {
        setPets((prevPets) => {
          const newPets = petsWithImages.filter(
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
      </div>
    </div>
  );
};

export default Page;
