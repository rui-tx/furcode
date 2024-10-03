import React from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";
const page = () => {
  const shelterHeaders = [
    { prettyLabel: "Shelter ID", columnName: "shelterId", type: "string" },
    { prettyLabel: "Shelter Name", columnName: "shelterName", type: "string" },
    {
      prettyLabel: "Shelter Address",
      columnName: "shelterAddress",
      type: "string",
    },
    {
      prettyLabel: "Shelter Phone",
      columnName: "shelterPhone",
      type: "string",
    },
    {
      prettyLabel: "Shelter Email",
      columnName: "shelterEmail",
      type: "string",
    },
    {
      prettyLabel: "Shelter Website",
      columnName: "shelterWebsite",
      type: "string",
    },
  ];

  const shelterData = [
    {
      shelterId: "S1",
      shelterName: "Shelter 1",
      shelterAddress: "123 Main St, Anytown, USA",
      shelterPhone: "123-456-7890",
      shelterEmail: "shelter1@example.com",
      shelterWebsite: "https://www.shelter1.com",
    },
    {
      shelterId: "S2",
      shelterName: "Shelter 2",
      shelterAddress: "456 Elm St, Anytown, USA",
      shelterPhone: "456-789-0123",
      shelterEmail: "shelter2@example.com",
      shelterWebsite: "https://www.shelter2.com",
    },
  ];

  return (
    <div className="backoffice-shelter-page-container">
      <Table
        key="shelter"
        headers={shelterHeaders}
        initialData={shelterData}
        enableEdit={false}
        enableDelete={false}
        currentId={null}
        deleteEndpoint=""
      />
    </div>
  );
};

export default page;
