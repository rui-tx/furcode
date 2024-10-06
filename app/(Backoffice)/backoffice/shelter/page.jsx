"use client";

import React, { useState, useEffect } from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";

const ShelterBackofficePage = () => {
  const [shelterData, setShelterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const shelterHeaders = [
    { prettyLabel: "ID", columnName: "id", type: "string" },
    { prettyLabel: "Name", columnName: "name", type: "string" },
    { prettyLabel: "VAT", columnName: "vat", type: "string" },
    { prettyLabel: "Email", columnName: "email", type: "string" },
    { prettyLabel: "Address 1", columnName: "address1", type: "string" },
    { prettyLabel: "Address 2", columnName: "address2", type: "string" },
    { prettyLabel: "Postal Code", columnName: "postalCode", type: "string" },
    { prettyLabel: "Phone", columnName: "phone", type: "string" },
    { prettyLabel: "Size", columnName: "size", type: "string" },
    { prettyLabel: "Active", columnName: "isActive", type: "boolean" },
    {
      prettyLabel: "Creation Date",
      columnName: "creationDate",
      type: "string",
    },
  ];

  useEffect(() => {
    fetchShelterData();
  }, []);

  const fetchShelterData = async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const shelterId = userData.shelterId;
      const token = localStorage.getItem("token");

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
      setShelterData([data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
      <h1>Your Shelter</h1>
      {shelterData && (
        <Table
          key="shelter"
          headers={shelterHeaders}
          initialData={shelterData}
          enableEdit={false}
          enableDelete={false}
          currentId={null}
          deleteEndpoint=""
        />
      )}
    </div>
  );
};

export default ShelterBackofficePage;
