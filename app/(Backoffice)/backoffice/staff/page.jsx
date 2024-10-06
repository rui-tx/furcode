"use client";

import React, { useState, useEffect } from "react";
import Table from "@/app/_components/Table/Table";
import PersonDropdown from "./PersonDropdown/PersonDropdown";
import "./styles/index.css";

const StaffPage = () => {
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const staffHeaders = [
    { prettyLabel: "Staff ID", columnName: "id", type: "string" },
    { prettyLabel: "First Name", columnName: "firstName", type: "string" },
    { prettyLabel: "Last Name", columnName: "lastName", type: "string" },
    { prettyLabel: "Email", columnName: "email", type: "string" },
    { prettyLabel: "Phone", columnName: "cellPhone", type: "string" },
  ];

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    setIsLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const shelterId = userData.shelterId; // Assuming the shelter ID is stored in the user data
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/getStaffInShelter/${shelterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch staff data");
      }

      const data = await response.json();
      setStaffData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPerson = async () => {
    if (!selectedPerson) {
      setError("Please select a person to add");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const shelterId = userData.shelterId;
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/addPersonToShelter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          personId: selectedPerson.id,
          shelterId: shelterId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add person to shelter");
      }

      const result = await response.json();
      console.log("Person added successfully:", result);

      // Refresh the staff data
      await fetchStaffData();
      setIsAddingPerson(false);
      setSelectedPerson(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="staff-page-container">
      <h1>Shelter Staff</h1>
      <button onClick={() => setIsAddingPerson(true)}>Add Person</button>
      {isAddingPerson && (
        <div>
          <PersonDropdown onSelectPerson={setSelectedPerson} />
          <button onClick={handleAddPerson} disabled={!selectedPerson}>
            Add Selected Person
          </button>
          <button onClick={() => setIsAddingPerson(false)}>Cancel</button>
        </div>
      )}
      <Table
        key="staff"
        headers={staffHeaders}
        initialData={staffData}
        enableEdit={false}
        enableDelete={false}
        currentId={null}
        deleteEndpoint=""
      />
    </div>
  );
};

export default StaffPage;
