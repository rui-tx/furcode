"use client";
import React, { useState, useEffect, useCallback } from "react";
import PetTable from "../_components/PetTable/PetTable"; // Adjust the import path as needed
import "./styles/index.css";
import Link from "next/link";
import { Plus } from "lucide-react";

const Page = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petId, setPetId] = useState(0);

  const petsHeaders = [
    { prettyLabel: "ID Animal", columnName: "id", type: "number" },
    { prettyLabel: "Nome", columnName: "name", type: "string" },
    { prettyLabel: "Idade", columnName: "age", type: "number" },
    { prettyLabel: "Cor", columnName: "color", type: "string" },
    { prettyLabel: "Adotado", columnName: "isAdopted", type: "bool" },
    { prettyLabel: "Vacinado", columnName: "isVaccinated", type: "bool" },
    { prettyLabel: "Tamanho", columnName: "size", type: "string" },
    { prettyLabel: "Peso", columnName: "weight", type: "number" },
    { prettyLabel: "Observações", columnName: "observations", type: "string" },
  ];

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/petGallery?page=1&limit=10", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError("Failed to load pets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePet = useCallback(async (editedPet) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = `/api/onePet/update/${editedPet.id}`;

      console.log("Sending PATCH request to:", url);
      console.log("Request payload:", JSON.stringify(editedPet, null, 2));

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedPet),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.log("Error response body:", responseText);

        if (response.status === 404) {
          throw new Error(
            `Pet not found. The ID ${editedPet.id} may be incorrect.`
          );
        }

        throw new Error(
          `HTTP error! status: ${response.status}, body: ${responseText}`
        );
      }

      const updatedPet = await response.json();
      console.log("Pet updated:", updatedPet);

      // Update the pet in the local state
      setPets((prevPets) =>
        prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      );
    } catch (e) {
      console.error("Failed to update pet:", e);
      setError("Failed to update pet: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeletePet = async (petId) => {
    try {
      const response = await fetch(`/api/v1/pet/delete/${petId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted pet from the local state
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));

      // Optionally, you can fetch all pets again to ensure full sync with backend
      // await fetchPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
      throw error;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="backoffice-pets-page-container">
      <div className="backoffice-buttons">
        <Link href="/backoffice/createpet" passHref>
          <button className="btn-add-pet">
            <Plus size={16} /> Add Animal
          </button>
        </Link>
      </div>
      <PetTable
        pets={pets}
        headers={petsHeaders}
        onSave={handleSavePet}
        onDelete={handleDeletePet}
      />
    </div>
  );
};

export default Page;
