"use client";
import React, { useState, useEffect } from "react";
import "./styles/index.css";
import ShelterImgTop from "../../../_components/ShelterImgTop/ShelterImgTop";
import ShelterCarousel from "@/app/_components/ShelterCarousel/ShelterCarousel";
import OneShelterDescription from "@/app/_components/OneShelterDescription/OneShelterDescription";
import Map from "@/app/_components/Map/Map";
import ShelterSocialMedia from "@/app/_components/ShelterSocialMedia/ShelterSocialMedia";
import ShelterPetCarousel from "../../../_components/ShelterPetCarousel/ShelterPetCarousel";
import { IoColorPaletteOutline, IoScaleOutline } from "react-icons/io5";
import { TbVaccine, TbCalendar, TbRuler3, ImFacebook2 } from "react-icons/tb";

const Page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shelter, setShelter] = useState([]);
  const [coordinates, setCoordinates] = useState([41.1517, -8.6099]); // Estado para coordenadas

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

        // Aqui você busca as coordenadas após obter os dados do abrigo
        fetchCoordinates(data.address1);
      } catch (e) {
        setError("Failed to fetch shelter data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShelter();
  }, [params.id]);

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates([lat, lon]);
        console.log("Coordinates:", lat, lon);
      } else {
        throw new Error("Endereço não encontrado");
      }
    } catch (err) {
      console.error("Erro ao buscar coordenadas:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="full-width-container">
      <div className="shelter-container">
        <div className="shelter-image-section">
          <img
            src={shelter.coverImage}
            alt="Imagem do Abrigo"
            className="shelter-image"
          />
        </div>
        <div className="shelter-description-section">
          <h1>{shelter.name}</h1>
          <span>
            <strong>Fundação:</strong> {shelter.creationDate}
          </span>
          <span>
            <strong>Morada:</strong> {shelter.address1}, {shelter.address2}
          </span>
          <span>
            <strong>Telefone:</strong> {shelter.phone}
          </span>
          <span>
            <strong>E-mail:</strong> {shelter.email}
          </span>
          <button className="contact-button">Entrar em Contato</button>
        </div>
      </div>

      {shelter.imageList?.length > 0 && (
        <div className="detailed-description">
          <h2>Fotos do Abrigo</h2>
          <div className="image-list">
            {shelter.imageList.map((image, index) => (
              <img
                key={index}
                src={image.data}
                alt={`Imagem do Abrigo ${index + 1}`}
                className="shelter-image"
              />
            ))}
          </div>
        </div>
      )}

      <div className="detailed-description">
        <h2>Sobre {shelter.name}</h2>
        <p>{shelter.description || "Descrição do abrigo não disponível."}</p>
      </div>

      <div className="detailed-description">
        <h2>Nossos Pets</h2>
        <p>Lista de pets disponíveis para adoção.</p>
        <div className="container-carousel-pet-container">
          <ShelterPetCarousel params={shelter.id} />
        </div>
      </div>

      <div className="container-shelter-map">
        <h2>Localização do Abrigo</h2>
        <p>Mapa mostrando a localização do abrigo.</p>
        <div className="one-shelter-map">
          <Map position={coordinates} className="map-shelter-map" />
        </div>
      </div>

      <div className="detailed-description">
        <h2>Redes Sociais</h2>
        <p>Links para as redes sociais do abrigo.</p>
        <p>Facebook: <a href="{shelter.facebook}">{shelter.facebook}</a></p>
        <p>Instagram: <a href="{shelter.instagram}">{shelter.instagram}</a></p>
        <p>WebPage: <a href="{shelter.twitter}">{shelter.twitter}</a></p>
      </div>
    </div>
  );
};

export default Page;
