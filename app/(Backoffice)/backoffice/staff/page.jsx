"use client";

import React, { useState, useEffect } from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";

const StaffPage = () => {
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const staffHeaders = [
    { prettyLabel: "Staff ID", columnName: "id", type: "string" },
    { prettyLabel: "First Name", columnName: "firstName", type: "string" },
    { prettyLabel: "Last Name", columnName: "lastName", type: "string" },
    { prettyLabel: "Email", columnName: "email", type: "string" },
    { prettyLabel: "Phone", columnName: "cellPhone", type: "string" },
  ];

  useEffect(() => {
    const fetchStaffData = async () => {
      setIsLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData.id;
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/getStaffInShelter/${userId}`, {
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

    fetchStaffData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="staff-page-container">
      <h1>Shelter Staff</h1>
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
