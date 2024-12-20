"use client";
import React, { useEffect, useState, useCallback } from "react";
import "./styles/index.css";
import Table from "@/app/_components/Table/Table";

const AdoptionRequestsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [petId, setPetId] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);

  const headers = [
    { prettyLabel: "ID", columnName: "id", type: "number" },
    { prettyLabel: "Nome", columnName: "name", type: "string" },
    { prettyLabel: "Email", columnName: "email", type: "string" },
    { prettyLabel: "Pet ID", columnName: "petId", type: "string" },
    { prettyLabel: "Data do Pedido", columnName: "date", type: "string" },
    { prettyLabel: "Shelter ID", columnName: "shelterId", type: "string" },
    { prettyLabel: "Estado", columnName: "state", type: "string" },
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
      console.log("data", data);

      const requestsWithPersonDetails = await Promise.all(
        data.map(async (request) => {
          try {
            const personResponse = await fetch(
              `/api/person/${request.personId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (!personResponse.ok) {
              throw new Error(`HTTP error! status: ${personResponse.status}`);
            }
            const personData = await personResponse.json();
            return {
              ...request,
              name: personData.firstName + " " + personData.lastName || "N/A",
              email:
                typeof personData.email === "string" ? personData.email : "N/A",
            };
          } catch (error) {
            console.error(
              `Failed to fetch person data for ID ${request.personId}:`,
              error
            );
            return {
              ...request,
              name: "Error fetching",
              email: "Error fetching",
            };
          }
        })
      );

      setAdoptionRequests(requestsWithPersonDetails);
    } catch (e) {
      console.error("Failed to fetch data:", e);
      setError("Failed to fetch adoption requests: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdoptionRequests();
  }, [fetchAdoptionRequests, refreshTrigger]);

  const handleStateChange = async (id, newState) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/adoptionRequest/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ state: newState }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Adoption request updated:", data);
      setPetId(data.petId);
      console.log("Pet ID: ", petId);

      setRefreshTrigger((prev) => prev + 1);
    } catch (e) {
      console.error("Failed to update adoption request:", e);
      setError("Failed to update adoption request: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    await handleStateChange(id, "ACCEPTED");
    setIsAccepted(true);
  };

  const handleRefuse = async (id) => {
    await handleStateChange(id, "REFUSED");
  };

  const handlePetAdopted = useCallback(async () => {
    if (petId === 0) return; 

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/onePet/update/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAdopted: true }),
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
  }, [petId]);

  useEffect(() => {
    if (isAccepted && petId !== 0) {
      handlePetAdopted();
    }
  }, [isAccepted, petId, handlePetAdopted]);

  if (loading) return <div>Loading adoption requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="backoffice-adoption-requests-container">
      <h1 className="adoption-requests-container-title">Adoções</h1>
      <Table
        key="adoptionRequests"
        headers={headers}
        initialData={adoptionRequests}
        enableEdit={false}
        enableDelete={false}
        currentId={null}
        deleteEndpoint=""
        onAccept={handleAccept}
        onRefuse={handleRefuse}
      />

      {isAccepted && handlePetAdopted(petId)}
    </div>
  );
};

export default AdoptionRequestsPage;
