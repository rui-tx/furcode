"use client";
import React, { useState, useEffect } from "react";
import "./styles/index.css";
import ShelterImgTop from "../../../_components/ShelterImgTop/ShelterImgTop";
import ShelterCarousel from "@/app/_components/ShelterCarousel/ShelterCarousel";
import OneShelterDescription from "@/app/_components/OneShelterDescription/OneShelterDescription";
import Map from "@/app/_components/Map/Map";
import ShelterSocialMedia from "@/app/_components/ShelterSocialMedia/ShelterSocialMedia";
import ShelterPetCarousel from "../../../_components/ShelterPetCarousel/ShelterPetCarousel";

const page = ({ params }) => {
  const position = [41.1517, -8.6099];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [shelter, setShelter] = useState([]);
    // address1,
    // address2,
    // creationDate,
    // email,
    // name, 
    // phone,
    // postalCode,
    // vat

  useEffect(() => {
    if (!params.id) {
      setError("No shelter ID provided");
      setLoading(false);
      return;
    }

    const fetchShelter = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const response = await fetch(`/api/shelter/oneShelter/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server response:", errorData);
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${
              errorData.message || "Unknown error"
            }`
          );
        }

        const data = await response.json();
        setShelter(data);
        console.log("Received shelter data:", data);
      } catch (e) {
        setError("Failed to fetch shelter data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShelter();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // return (
    // <div className="one-shelter-container-all">
    //   <div className="container-name-shelter">
    //     <p>Mindera</p>
    //   </div>
    //   <div className="container-shelter-description">
    //     <div className="container-shelter-description-carousel">
    //       {shelterInformation.map((shelterInformation, index) => (
    //         <ShelterCarousel
    //           key={index}
    //           shelterImages={shelterInformation.shelterImages}
    //         />
    //       ))}
    //     </div>
    //     <div className="container-one-shelter-full-container">
    //       <div className="container-one-shelter-container-description">
    //         {shelterInformation.map((shelterInformation, index) => (
    //           <OneShelterDescription
    //             key={index}
    //             shelterHistory={shelterInformation.shelterHistory}
    //             shelterSocialMedia={shelterInformation.shelterSocialMedia}
    //           />
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="container-carousel-pet-container">
    //     <ShelterPetCarousel />
    //   </div>

    //   <div className="container-shelter-map">
    //     <div className="one-shelter-map">
    //       <div className="one-shelter-map-map">
    //         <Map position={position} />
    //       </div>

    //       <div className="container-one-shelter-social-media">
    //         <ShelterSocialMedia />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  // );
};

export default page;
