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
    { prettyLabel: "Pet ID", columnName: "id", type: "number" },
    { prettyLabel: "Pet Name", columnName: "name", type: "string" },
    { prettyLabel: "Age", columnName: "age", type: "number" },
    { prettyLabel: "Color", columnName: "color", type: "string" },
    { prettyLabel: "Adopted", columnName: "isAdopted", type: "bool" },
    { prettyLabel: "Vaccinated", columnName: "isVaccinated", type: "bool" },
    { prettyLabel: "Size", columnName: "size", type: "string" },
    { prettyLabel: "Weight", columnName: "weight", type: "number" },
    { prettyLabel: "Observations", columnName: "observations", type: "string" },
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

  const handleSavePet = useCallback(
    async (editedPet) => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/onePet/update/${petId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedPet),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Pet adoption status updated:", data);

        setRefreshTrigger((prev) => prev + 1);
        setIsAccepted(false);
      } catch (e) {
        console.error("Failed to update pet adoption status:", e);
        setError("Failed to update pet adoption status: " + e.message);
      } finally {
        setLoading(false);
      }
    },
    [petId]
  );
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
            <Plus size={16} /> Add Pet
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
