import Table from "@/app/_components/Table/Table";
import React from "react";
import "./styles/index.css";

const Page = () => {
  const headers = [
    { prettyLabel: "ID Animal", columnName: "animalId", type: "string" },
    { prettyLabel: "Nome", columnName: "animalName", type: "string" },
    { prettyLabel: "Tipo", columnName: "animalType", type: "string" },
    { prettyLabel: "Raça", columnName: "animalBreed", type: "string" },
    { prettyLabel: "Data", columnName: "reportDate", type: "string" },
    { prettyLabel: "Reportado por", columnName: "reportedBy", type: "string" },
    { prettyLabel: "Reportado a", columnName: "reportedTo", type: "string" },
    {
      prettyLabel: "Detalhes",
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
