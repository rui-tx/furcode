"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { IoColorPaletteOutline, IoScaleOutline } from "react-icons/io5";
import { TbVaccine, TbCalendar, TbRuler3 } from "react-icons/tb";
import "./styles/index.css";

const PetContext = createContext();

const Page = ({ params }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const [shelter, setShelter] = useState("");

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/onePet/onePet/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Pet not found");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPet(data);
        setShelter(data.shelterId);
      } catch (e) {
        console.error("Failed to fetch pet data:", e);
        setError("Failed to fetch pet data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [params.id, reload]);

  if (loading) {
    return <div>Loading...</div>;
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
    <PetContext.Provider value={{ shelter }}>
      <div className="full-width-container">
        <div className="pet-container">
          <div className="pet-image-section">
            <img
              src={pet.coverImage}
              alt="Animal Image"
              className="animal-image"
            />
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

        {pet.imageList?.length > 0 && (
          <div className="detailed-description">
            <h2>Fotos</h2>
            <div className="image-list">
              {pet.imageList?.map((image, index) => (
                <p key={index}>
                  <img
                    src={image.data}
                    alt="Animal Image"
                    className="animal-image"
                  />
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="detailed-description">
          <h2>Sobre {pet.name}</h2>
          <p>{pet?.observations}</p>
        </div>

        <div className="detailed-description">
          <h2>
            Sobre o abrigo <strong>Pet Home</strong>
          </h2>
          <p>
            O abrigo Pet Home é um espaço de lazer para animais de estimação
            maravilhosos. Ele é um lugar onde você pode se divertir e se
            divertir com seus animais favoritos. Não perca mais tempo procurando
            por um abrigo para seu animal favorito.
          </p>
        </div>

        <div className="detailed-description">
          <h2>Localização do abrigo</h2>
          <p>mapa aqui</p>
        </div>
      </div>
    </PetContext.Provider>
  );
};

export default Page;
