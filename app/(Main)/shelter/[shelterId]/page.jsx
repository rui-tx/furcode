"use client";
import React from "react";
import "./styles/index.css";
import ShelterImgTop from "../../../_components/ShelterImgTop/ShelterImgTop";
import ShelterCarousel from "@/app/_components/ShelterCarousel/ShelterCarousel";
import OneShelterDescription from "@/app/_components/OneShelterDescription/OneShelterDescription";
import Map from "@/app/_components/Map/Map";
import ShelterSocialMedia from "@/app/_components/ShelterSocialMedia/ShelterSocialMedia";

const page = () => {
  const position = [41.1517, -8.6099];
  const shelterInformations = [
    {
      imageShelterLogo:
        "https://devskiller.com/wp-content/uploads/2022/06/logo-mindera.svg",
      altImageShelter: "Logo da associação",
      shelterImages: [
        "https://storage.googleapis.com/mindera-cms-media-uploads/Becoming_A_Back_End_Developer_1_7cbf5900a7/Becoming_A_Back_End_Developer_1_7cbf5900a7.png",
        "https://avatars.githubusercontent.com/u/43017609?s=280&v=4",
      ],
      shelterHistory:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur vitae purus nec libero varius dictum. Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur vitae purus nec libero varius dictum. Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur vitae purus nec libero varius dictum. Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt.Praesent eget dolor ac mi malesuada interdum. Sed suscipit diam id orci efficitur, eget commodo risus tincidunt. Cras viverra justo sit amet est venenatis, vitae facilisis mi fermentum. Ut dictum sapien vel tincidunt.",
      shelterSocialMedia: "",
    },
  ];

  return (
    <div className="one-shelter-container-all">
      {shelterInformations.map((shelterInformation, index) => (
        <ShelterImgTop
          key={index}
          imageShelter={shelterInformation.imageShelterLogo}
          altImageShelter={shelterInformation.altImageShelter}
        />
      ))}
      <div className="container-shelter-description">
        {shelterInformations.map((shelterInformation, index) => (
          <ShelterCarousel
            key={index}
            shelterImages={shelterInformation.shelterImages}
          />
        ))}
        {shelterInformations.map((shelterInformation, index) => (
          <OneShelterDescription
            key={index}
            shelterHistory={shelterInformation.shelterHistory}
            shelterSocialMedia={shelterInformation.shelterSocialMedia}
          />
        ))}
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
