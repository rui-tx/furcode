"use client";

import { useEffect, useState } from "react";
import { IoColorPaletteOutline, IoScaleOutline } from "react-icons/io5";
import { TbVaccine, TbCalendar, TbRuler3 } from "react-icons/tb";

import "./styles/index.css";

const Page = ({ params }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    const fetchPet = async () => {
      try {
        const response = await fetch("/api/getPet?id=" + params.id);
        if (!response.ok) {
          if (response.status === 404) {
            //setError("Pet not found");
            const test = {
              id: 2,
              name: "Roofie",
              petTypeId: 2,
              shelterId: 3,
              isAdopted: true,
              isVaccinated: true,
              size: "Grande",
              weight: 5.5,
              color: "White",
              age: 3,
              observations: "I love my pet",
              image:
                "https://cloud.ducknexus.com/s/SQbyMzH5EtNCpn6/download/IMG_9245.JPG",
            };
            setPet(test);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPet(data);
      } catch (e) {
        console.error("Failed to fetch pet data:", e);
        setError("Failed to fetch pet data");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading screen
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="full-width-container">
      <div className="pet-container">
        <div className="pet-image-section">
          <img src={pet.image} alt="Animal Image" className="animal-image" />
        </div>

        <div className="pet-description-section">
          <h1>{pet.name}</h1>
          <span>
            <TbRuler3 />
            &nbsp;
            <strong>Tamanho:&nbsp;</strong> {pet.size}
          </span>
          <span>
            <IoScaleOutline />
            &nbsp;
            <strong>Peso:&nbsp;</strong> {pet.weight} kgs
          </span>

          <span>
            <IoColorPaletteOutline />
            &nbsp;
            <strong>Cor:&nbsp;</strong> {pet.color}
          </span>
          <span>
            <TbCalendar />
            &nbsp;
            <strong>Idade:&nbsp;</strong>
            {pet.age} anos
          </span>
          <span>
            <TbVaccine />
            &nbsp;
            <strong>Vacinado:&nbsp;</strong>
            {pet.isVaccinated ? " Sim" : " Não"}
          </span>

          <button className="adopt-button">Adota-me!</button>
          <button className="like-button">❤️</button>
        </div>
      </div>
      <div className="detailed-description">
        <h2>Sobre {pet.name}</h2>
        <p>
          {pet.name} é um animal de estimação maravilhoso que tem muito amor
          para dar. Ele está conosco há {pet.age} anos e é conhecido pela sua
          natureza brincalhona e personalidade amigável. Apesar de seu tamanho{" "}
          {pet.size}, {pet.name} é muito gentil e adora estar perto de pessoas.
        </p>
      </div>

      <div className="detailed-description">
        <h2>
          Sobre o abrigo <strong>Pet Home</strong>
        </h2>
        <p>
          O abrigo Pet Home é um espaço de lazer para animais de estimação
          maravilhosos. Ele é um lugar onde você pode se divertir e se divertir
          com seus animais favoritos. Não perca mais tempo procurando por um
          abrigo para seu animal favorito.
        </p>
      </div>

      <div className="detailed-description">
        <h2>Localização do abrigo</h2>
        <p>mapa aqui</p>
      </div>
    </div>
  );
};

export default Page;
