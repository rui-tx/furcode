"use client";
import Table from "@/app/_components/Table/Table";
import React, { useState, useEffect, useCallback } from "react";
import "./styles/index.css";
import { useAuth } from "@/app/context/AuthContext";

const Page = () => {
  const { user, token } = useAuth();
  const [shelters, setShelters] = useState([]);
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const donationHeaders = [
    { prettyLabel: "ID", columnName: "id", type: "number" },
    { prettyLabel: "Nome", columnName: "personId", type: "number" },
    { prettyLabel: "Shelter", columnName: "shelterId", type: "number" },
    { prettyLabel: "Total", columnName: "total", type: "number" },
    { prettyLabel: "Data", columnName: "date", type: "string" },
  ];

  const fetchDonations = useCallback(async () => {
    if (!user || !user.shelterIds || !token) return;

    try {
      setLoading(true);
      const allDonations = [];

      for (const shelterId of user.shelterIds) {
        const response = await fetch(`/api/donations/all/${shelterId}`, {
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
        console.log("Doações recebidas para o abrigo:", data);
        
        allDonations.push(...data);
      }
      setDonationData(allDonations);
     
    } catch (e) {
      console.error("Erro ao buscar doações:", e);
      setError("Falha ao buscar doações: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  if (loading) return <div>Carregando doações...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="donations-page-container">
      <h1>Donations</h1>
      <Table
        key="donations"
        headers={donationHeaders}
        initialData={donationData}
        enableEdit={false}
        enableDelete={false}
        currentId={null}
        deleteEndpoint=""
      />
    </div>
  );
};

export default Page;
