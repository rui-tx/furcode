import React, { useState, useEffect } from "react";
import "./styles/index.css";

const TotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTotalDonations();
  }, []);

  const fetchTotalDonations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/donations/total");
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const data = await response.json();
      console.log("Total donations:", data);
      setTotalDonations(data.total);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading total donations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 className="total-donations-h1">
        Total Doado:{" "}
        {totalDonations !== null ? `${totalDonations.toFixed(2)}€` : "N/A"}
      </h1>
      <p className="total-donations-p">Seu apoio faz toda a diferença!</p>
    </>
  );
};

export default TotalDonations;
