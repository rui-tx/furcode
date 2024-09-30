"use client";
import React from "react";
import "./styles/index.css";
import ShelterImgTop from "../../../_components/ShelterImgTop/ShelterImgTop";
import ShelterCarousel from "@/app/_components/ShelterCarousel/ShelterCarousel";
import OneShelterDescription from "@/app/_components/OneShelterDescription/OneShelterDescription";
import Map from "@/app/_components/Map/Map";
import ShelterSocialMedia from "@/app/_components/ShelterSocialMedia/ShelterSocialMedia";
import ShelterPetCarousel from "@/app/_components/ShelterPetCarousel/ShelterPetCarousel";

const page = () => {
  const position = [41.1517, -8.6099];
  const shelterInformations = [
    {
      imageShelterLogo:
        "https://devskiller.com/wp-content/uploads/2022/06/logo-mindera.svg",
      altImageShelter: "Logo da associação",
      shelterImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9AQf4ohMi_rWeGB6GIaRVs1kG7X-bGhvXQ&s",
        "https://storage.googleapis.com/mindera-cms-media-uploads/medium_1_ACFC_Blog_image_3645b6a798/medium_1_ACFC_Blog_image_3645b6a798.png",
      ],
      shelterHistory:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur vitae purus nec libero varius dictum. Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur vitae purus nec libero varius dictum. Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur vitae purus nec libero varius dictum. Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt.Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt.",
      shelterSocialMedia: "",
    },
  ];

  return (
    <div className="one-shelter-container-all">
      <div className="container-name-shelter">
        <p>Mindera</p>
      </div>
      <div className="container-shelter-description">
        <div className="container-shelter-description-carousel">
          {shelterInformations.map((shelterInformation, index) => (
            <ShelterCarousel
              key={index}
              shelterImages={shelterInformation.shelterImages}
            />
          ))}
        </div>
        <div className="container-one-shelter-full-container">
          <div className="container-one-shelter-container-description">
            {shelterInformations.map((shelterInformation, index) => (
              <OneShelterDescription
                key={index}
                shelterHistory={shelterInformation.shelterHistory}
                shelterSocialMedia={shelterInformation.shelterSocialMedia}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container-carousel-pet-container">
        <ShelterPetCarousel />
      </div>

      <div className="container-shelter-map">
        <div className="one-shelter-map">
          <div className="one-shelter-map-map">
            <Map position={position} />
          </div>

          <div className="container-one-shelter-social-media">
            <ShelterSocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
