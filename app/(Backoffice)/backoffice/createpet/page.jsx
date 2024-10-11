"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Table from "@/app/_components/Table/Table";
import ImageUpload from "@/app/_components/ImageUpload/ImageUpload";

import "./styles/index.css";

const Page = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [reload, setReload] = useState(0);
  const [petList, setPetList] = useState([]);
  const [petData, setPetData] = useState({
    name: "Roofie",
    petTypeId: 1,
    shelterId: 1,
    isAdopted: false,
    isVaccinated: true,
    size: "SMALL",
    weight: 5.5,
    color: "Castanho",
    age: 5,
    observations: "Rufa Lufa",
    breedName: "Hokkaido",
  });
  const [petImage, setPetImage] = useState(null);
  const [petImageExtension, setPetImageExtension] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const { token } = useAuth();

  const tableHeaders = [
    {
      columnName: "id",
      prettyLabel: "ID",
      type: "number",
    },
    {
      columnName: "name",
      prettyLabel: "Name",
      type: "string",
    },
  ];

  const handlePetList = async () => {
    if (petList.length > 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    // await fetch("https://apifurcode.ducknexus.com/api/v1/pets/")
    //   .then((response) => response.json())
    //   .then((json) => setPetList(json));

    setLoading(false);
  };

  useEffect(() => {
    handlePetList();
  }, [reload]);

  // get breeds from local storage or fetch from backend
  useEffect(() => {
    setLoading(true);
    if (sessionStorage.getItem("dog_breeds")) {
      setBreeds(JSON.parse(sessionStorage.getItem("dog_breeds")));
      return;
    }
    const fetchBreeds = async () => {
      const url = "/api/dogBreed";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreeds(data);
        localStorage.setItem("dog_breeds", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to fetch breeds:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
    handlePetList();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetData({
      ...petData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petImage) {
      alert("Por favor, selecione uma imagem para o pet.");
      return;
    }
    setSent(true);
    try {
      const petDataWithImage = {
        ...petData,
        coverImage: petImage,
      };
      const response = await fetch("/api/createPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(petDataWithImage),
      });

      const responseData = await response.json();
      if (response.ok) {
        //upload image
        const formData = new FormData();
        formData.append("file", petImage);

        const response = await fetch(
          `/api/uploadImage?to=pet&id=${responseData.id}&cover=true&extension=${petImageExtension}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        alert("Animal criado com sucesso! ID: " + responseData.id);
      } else {
        console.error("Failed to create pet.");
        alert("Failed to create pet.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setSent(false);
  };

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

  return (
    <div className="pet-info">
      <h2>Criar Animal - Cão</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="breedName">
            Raça:
          </label>
          <select
            id="breedName"
            name="breedName"
            value={petData.breedName}
            onChange={handleChange}
            className="select"
          >
            {breeds?.breeds?.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="name">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={petData.name}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="isVaccinated">
            <input
              type="checkbox"
              id="isVaccinated"
              name="isVaccinated"
              checked={petData.isVaccinated}
              onChange={handleChange}
              className="checkbox"
            />
            Vacinado:
          </label>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="size">
            Porte:
          </label>
          <select
            id="size"
            name="size"
            value={petData.size}
            onChange={handleChange}
            className="select"
          >
            <option value="SMALL">Pequeno</option>
            <option value="MEDIUM">Médio</option>
            <option value="LARGE">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="weight">
            Peso:
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={petData.weight}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="color">
            Cor:
          </label>
          <select
            id="color"
            name="color"
            value={petData.color}
            onChange={handleChange}
            className="select"
          >
            {[
              "Castanho",
              "Branco",
              "Verde",
              "Amarelo",
              "Azul",
              "Marrom",
              "Preto",
            ].map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="age">
            Idade:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={petData.age}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="observations">
            Observações:
          </label>
          <textarea
            id="observations"
            name="observations"
            value={petData.observations}
            onChange={handleChange}
            className="textarea"
          ></textarea>
        </div>

        <div className="upload-image-container">
          <ImageUpload
            to="pet"
            id={0}
            noUpload={true}
            setPetImage={setPetImage}
            setPetImageExtension={setPetImageExtension}
          />
        </div>

        {!sent && (
          <button type="submit" className="button">
            Criar
          </button>
        )}
      </form>
    </div>
  );
};

export default Page;
