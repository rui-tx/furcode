"use client";
import React, { useState, useEffect, useCallback } from "react";
import Table from "../Table/Table";

const AllDonationsById = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [shelters, setShelters] = useState([]);

  const headers = [
    { prettyLabel: "Data", columnName: "date", type: "string" },
    { prettyLabel: "Valor €", columnName: "total", type: "number" },
    { prettyLabel: "Associação", columnName: "shelter", type: "string" },
  ];

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`/api/donations/all/${user.id}`, {
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
      console.log("Donations data:", data);
      setDonations(data);
    } catch (e) {
      console.error("Failed to fetch donations data:", e);
      setError("Failed to fetch donations data: " + e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchShelters = useCallback(async (shelterIds) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");

      // Fazer uma requisição separada para cada ID de abrigo
      const fetchPromises = shelterIds.map((shelterId) =>
        fetch(`/api/shelter/oneShelter/${shelterId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );

      const sheltersData = await Promise.all(fetchPromises);
      console.log("Shelters data:", sheltersData);
      setShelters(sheltersData);
    } catch (e) {
      console.error("Failed to fetch shelters data:", e);
      setError("Failed to fetch shelters data: " + e.message);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDonations();
    };
    fetchData();
  }, [fetchDonations]);

  useEffect(() => {
    if (donations.length > 0) {
      const shelterIds = donations.map((donation) => donation.shelterId);
      fetchShelters(shelterIds);
    }
  }, [donations, fetchShelters]);

  const transformedDonations = donations.map((donation) => {
    const transformedShelter = shelters.find(
      (shelter) => shelter.id === donation.shelterId
    );
    const shelterName = transformedShelter.name ;

    return {
      ...donation,
      date: new Date(donation.date).toLocaleDateString(),
      total: parseFloat(donation.total).toFixed(2),
      shelter: shelterName,
    };
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-donations-all">
      <Table
        key="donations"
        headers={headers}
        initialData={transformedDonations}
        enableEdit={false}
        enableDelete={false}
        imageSize={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default AllDonationsById;
