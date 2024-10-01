"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Table from "@/app/_components/Table/Table";

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
    setSent(true);
    try {
      const response = await fetch("/api/createPet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(petData),
      });
      if (response.ok) {
        //console.log("Pet created successfully!");
        alert("Pet created successfully!");
        // Handle success response
      } else {
        console.error("Failed to create pet.");
        alert("Failed to create pet.");
        // Handle error response
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
      <h2>Criar novo Animal - Cão</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label className="label">Raça:</label>
          <select
            name="breedName"
            value={petData.breedName}
            onChange={handleChange}
          >
            {breeds?.breeds?.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label className="label">Nome:</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleChange}
          />
        </p>
        <p>
          <label className="label">Vacinado/a:</label>
          <input
            type="checkbox"
            name="isVaccinated"
            checked={petData.isVaccinated}
            onChange={handleChange}
          />
        </p>
        <p>
          <label className="label">Porte:</label>
          <select name="size" value={petData.size} onChange={handleChange}>
            <option value="SMALL">Pequeno</option>
            <option value="MEDIUM">Médio</option>
            <option value="LARGE">Grande</option>
          </select>
        </p>
        <p>
          <label className="label">Peso:</label>
          <input
            type="number"
            name="weight"
            value={petData.weight}
            onChange={handleChange}
          />
        </p>
        <p>
          <label className="label">Cor:</label>
          <select name="color" value={petData.color} onChange={handleChange}>
            <option value="Castanho">Castanho</option>
            <option value="Branco">Branco</option>
            <option value="Verde">Verde</option>
            <option value="Amarelo">Amarelo</option>
            <option value="Azul">Azul</option>
            <option value="Marrom">Marrom</option>
            <option value="Preto">Preto</option>
          </select>
        </p>
        <p>
          <label className="label">Idade:</label>
          <input
            type="number"
            name="age"
            value={petData.age}
            onChange={handleChange}
          />
        </p>
        <p>
          <label className="label">Observações:</label>
          <textarea
            name="observations"
            value={petData.observations}
            onChange={handleChange}
          ></textarea>
        </p>
        {!sent && <button type="submit">Criar</button>}
      </form>
      {/* <Table headers={tableHeaders} initialData={petList} /> */}
    </div>
  );
};

export default Page;
