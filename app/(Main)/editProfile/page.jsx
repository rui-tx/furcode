"use client";
import React, { useState, useEffect } from "react";
import EditProfileForm from "../../_components/EditProfileForm/EditProfileForm";
import Table from "../../_components/Table/Table";
import "./styles/index.css";

const Page = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [activeTable]);

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
      setHeaders(result.headers);
    } catch (e) {
      setError(`Failed to fetch data: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTable === "adoptedAnimals") {
      fetchData("/api/ProfilePets");
    } else if (activeTable === "donations") {
      fetchData("/api/ProfileDonation");
    }
  }, [activeTable]);

  const handleTableChange = (newTable) => {
    setActiveTable(newTable);
  };

  const renderTable = () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!activeTable) return null;

    return (
      <Table
        key={key}
        headers={headers}
        initialData={data}
        enableEdit={false}
        enableDelete={false}
        imageSize={{ width: 100, height: 100 }}
      />
    );
  };
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Your Pawsome Profile</h1>
        <p>Update your information and view your adoption journey</p>
      </div>
      <div className="profile-content">
        <EditProfileForm />

        <div className="activity-container">
          <h2>Your Activity</h2>
          <div className="table-controls">
            <button
              onClick={() => handleTableChange("donations")}
              className={`table-control-btn ${
                activeTable === "donations" ? "active" : ""
              }`}
            >
              Your Donations
            </button>
            <button
              onClick={() => handleTableChange("adoptedAnimals")}
              className={`table-control-btn ${
                activeTable === "adoptedAnimals" ? "active" : ""
              }`}
            >
              Adopted Furry Friends
            </button>
          </div>
          <div className="table-container">{renderTable()}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
