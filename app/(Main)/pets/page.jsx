"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GalleryPetCard from "../../_components/GalleryPetCard/GalleryPetCard";
import GalleryUpperText from "../../_components/GalleryUpperText/GalleryUpperText";
import "./styles/index.css";
import SideBarPets from "../../_components/SideBarPets/SideBarPets";

const Page = () => {
  const [pets, setPets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/petsGallery");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPets(data);
        console.log(data);
      } catch (e) {
        console.error("Falha ao buscar pets:", e);
      }
    };

    fetchPets();
  }, []);

  const handleClick = (id) => {
    router.push(`/pets/${id}`);
  };

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
              onClick={() => handleClick(pet.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
