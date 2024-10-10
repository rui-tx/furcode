import Table from "@/app/_components/Table/Table";
import React from "react";
import "./styles/index.css";

const Page = () => {
  const headers = [
    { prettyLabel: "Animal ID", columnName: "animalId", type: "string" },
    { prettyLabel: "Animal Name", columnName: "animalName", type: "string" },
    { prettyLabel: "Animal Type", columnName: "animalType", type: "string" },
    { prettyLabel: "Animal Breed", columnName: "animalBreed", type: "string" },
    { prettyLabel: "Report Date", columnName: "reportDate", type: "string" },
    { prettyLabel: "Reported By", columnName: "reportedBy", type: "string" },
    { prettyLabel: "Reported To", columnName: "reportedTo", type: "string" },
    {
      prettyLabel: "Reported Details",
      columnName: "reportedDetails",
      type: "string",
    },
  ];

  const data = [
    {
      animalId: "1",
      animalName: "Dog",
      animalType: "Dog",
      animalBreed: "Labrador",
      reportDate: "2023-05-01",
      reportedBy: "John Doe",
      reportedTo: "Jane Doe",
      reportedDetails: "Reported details",
    },
    {
      animalId: "2",
      animalName: "Cat",
      animalType: "Cat",
      animalBreed: "Persian",
      reportDate: "2023-05-02",
      reportedBy: "John Doe",
      reportedTo: "Jane Doe",
      reportedDetails: "Reported details",
    },
  ];

  return (
    <div className="backoffice-animal-reports-container">
      <Table
        key={1}
        headers={headers}
        initialData={data}
        enableEdit={true}
        enableDelete={false}
        currentId={null}
        deleteEndpoint=""
      />
    </div>
  );
};

export default Page;
