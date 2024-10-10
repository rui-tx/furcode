"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PetCard from "../PetCard/PetCard";
import "./styles/index.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

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

const ShelterPetCarousel = ({ params }) => {
  const [sliderSettings, setSliderSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [petsInShelter, setPetsInShelter] = useState([]);

  useEffect(() => {
    if (!params) return;

    setLoading(true);
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/petGallery/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            setError("Pet not found");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Pet data:", data);


        const petsWithImages = await Promise.all(
          data.map(async (pet) => {
            const image = await fetchPetImages(pet.id);
            return { ...pet, image };
          })
        );

        setPetsInShelter(petsWithImages);
      } catch (e) {
        console.error("Failed to fetch pet data:", e);
        setError("Failed to fetch pet data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [params, reload]);

  useEffect(() => {
    const loadStyles = async () => {
      await import("slick-carousel/slick/slick.css");
      await import("slick-carousel/slick/slick-theme.css");
    };
    loadStyles();

    setSliderSettings({
      dots: false,
      infinite: true,
      speed: 900,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1224,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 620,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }, []);

  if (!sliderSettings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel-pet-shelter-container">
      <Slider {...sliderSettings} className="shelter-animal-slider">
        {petsInShelter.map((pet, index) => (
          <div key={index} className="slide-shelter-animal-item">
            <PetCard image={pet.image} name={pet.name} breed={pet.breed} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShelterPetCarousel;
