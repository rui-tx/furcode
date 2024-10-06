"use client";
import React, { useEffect, useState,useCallback } from "react";
import "./styles/index.css";
import Table from "@/app/_components/Table/Table";
import Person from "../_components/fetchPerson/Person";

const AdoptionRequestsPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [personNames, setPersonNames] = useState({});
  
    const headers = [
      { prettyLabel: "ID", columnName: "id", type: "number" },
      { prettyLabel: "Nome Adotante", columnName: "name", type: "string" },
      { prettyLabel: "Adotante ID", columnName: "personId", type: "string" },
      { prettyLabel: "Pet ID", columnName: "petId", type: "string" },
      { prettyLabel: "Data do Pedido", columnName: "date", type: "string" },
      { prettyLabel: "Shelter ID", columnName: "shelterId", type: "string" },
    ];
  
    const fetchAdoptionRequests = useCallback(async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch(`/api/adoptionRequest/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAdoptionRequests(data);
      } catch (e) {
        console.error("Failed to fetch data:", e);
        setError("Failed to fetch adoption requests: " + e.message);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchAdoptionRequests();
    }, [fetchAdoptionRequests]);
  
    const handleNameFetched = useCallback((id, name) => {
      setPersonNames(prev => {
        if (prev[id] === name) return prev; 
        return { ...prev, [id]: name };
      });
    }, []);
  
    const uniquePersonIds = [...new Set(adoptionRequests.map(request => request.personId))];
  
    const transformedData = adoptionRequests.map(request => ({
      ...request,
      name: personNames[request.personId] || "Loading...",
    }));
  
    if (loading && adoptionRequests.length === 0) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div className="backoffice-adoption-requests-container">
        {uniquePersonIds.map(personId => (
          <Person 
            key={personId} 
            id={personId} 
            onNameFetched={handleNameFetched}
          />
        ))}
        <Table
          key="adoptionRequests"
          headers={headers}
          initialData={transformedData}
          enableEdit={true}
          enableDelete={true}
          currentId={null}
          deleteEndpoint=""
        />
      </div>
    );
  };
  
  export default AdoptionRequestsPage;
