"use client";
import React, { useState, useEffect } from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";

const ShelterBackofficePage = () => {
  const [shelterData, setShelterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const shelterHeaders = [
    { prettyLabel: "ID Abrigo", columnName: "id", type: "string" },
    { prettyLabel: "Nome", columnName: "name", type: "string" },
    { prettyLabel: "NIF", columnName: "vat", type: "string" },
    { prettyLabel: "Email", columnName: "email", type: "string" },
    { prettyLabel: "Direção", columnName: "address1", type: "string" },
    { prettyLabel: "Direção 2", columnName: "address2", type: "string" },
    { prettyLabel: "Código Postal", columnName: "postalCode", type: "string" },
    { prettyLabel: "Telefone", columnName: "phone", type: "string" },
    { prettyLabel: "Tamanho", columnName: "size", type: "string" },
    { prettyLabel: "Ativo", columnName: "isActive", type: "boolean" },
    {
      prettyLabel: "Data Abertura",
      columnName: "creationDate",
      type: "string",
    },
  ];

  useEffect(() => {
    fetchShelterData();
  }, []);

  const fetchShelterData = async () => {
    console.log("Fetching shelter data");
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const shelterId = userData.shelterId;
      const token = localStorage.getItem("token");
      console.log("Shelter ID:", shelterId);
      console.log("Token:", token);

      if (!shelterId) {
        throw new Error("No shelter ID found for this user");
      }
      const response = await fetch(`/api/getShelter/${shelterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch shelter data");
      }
      const data = await response.json();
      console.log("Fetched shelter data:", data);
      setShelterData([data]);
    } catch (err) {
      console.error("Error fetching shelter data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataChange = async (newData) => {
    console.log("Data changed:", newData);
    if (newData && newData.length > 0) {
      const updatedShelter = newData[0];
      try {
        const token = localStorage.getItem("token");
        console.log("Using token for save:", token);

        const response = await fetch(
          `/api/v1/shelter/update/${updatedShelter.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedShelter),
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          let errorMessage;
          if (response.status === 404) {
            errorMessage = `Shelter with ID ${updatedShelter.id} not found`;
          } else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const errorData = await response.json();
              errorMessage = errorData.error || "Failed to update shelter data";
            } else {
              errorMessage = await response.text();
            }
          }
          throw new Error(errorMessage);
        }

        const savedShelter = await response.json();
        console.log("Saved shelter data:", savedShelter);

        setShelterData([savedShelter]);
      } catch (err) {
        console.error("Error saving shelter data:", err);
        setError(err.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="backoffice-shelter-page-container">
      <h1>A Sua Associação</h1>
      {shelterData && (
        <Table
          key="shelter"
          headers={shelterHeaders}
          initialData={shelterData}
          enableEdit={true}
          enableDelete={false}
          currentId={null}
          deleteEndpoint=""
          onDataChange={handleDataChange}
        />
      )}
    </div>
  );
};

export default ShelterBackofficePage;
