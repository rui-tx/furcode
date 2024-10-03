"use client";
import React, { useState, useEffect } from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";
import Link from "next/link";
import { Plus } from "lucide-react";

const Page = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const petsHeaders = [
    { prettyLabel: "Pet ID", columnName: "id", type: "number" },
    { prettyLabel: "Pet Name", columnName: "name", type: "string" },
    { prettyLabel: "Age", columnName: "age", type: "number" },
    { prettyLabel: "Color", columnName: "color", type: "string" },
    { prettyLabel: "Adopted", columnName: "isAdopted", type: "string" },
    { prettyLabel: "Vaccinated", columnName: "isVaccinated", type: "string" },
    { prettyLabel: "Size", columnName: "size", type: "string" },
    { prettyLabel: "Weight", columnName: "weight", type: "number" },
    { prettyLabel: "Observations", columnName: "observations", type: "string" },
  ];

  useEffect(() => {
    const fetchPets = async () => {
      try {
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
        const transformedData = data.map((pet) => ({
          ...pet,
          isAdopted: pet.isAdopted ? "Yes" : "No",
          isVaccinated: pet.isVaccinated ? "Yes" : "No",
        }));
        setPets(transformedData);
        console.log("Pets data:", transformedData);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

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
      <Table
        key="pets"
        headers={petsHeaders}
        initialData={pets}
        enableEdit={true}
        enableDelete={true}
      />
    </div>
  );
};

export default Page;
