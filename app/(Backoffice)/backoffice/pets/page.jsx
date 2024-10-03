import React from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";
import Link from "next/link";
import { Plus } from "lucide-react";

const Page = () => {
  const petsHeaders = [
    { prettyLabel: "Pet ID", columnName: "petId", type: "string" },
    { prettyLabel: "Pet Name", columnName: "petName", type: "string" },
    { prettyLabel: "Pet Type", columnName: "petType", type: "string" },
    { prettyLabel: "Pet Breed", columnName: "petBreed", type: "string" },
    { prettyLabel: "Report Date", columnName: "reportDate", type: "string" },
    { prettyLabel: "Reported By", columnName: "reportedBy", type: "string" },
    { prettyLabel: "Reported To", columnName: "reportedTo", type: "string" },
    {
      prettyLabel: "Reported Details",
      columnName: "reportedDetails",
      type: "string",
    },
  ];

  const petsData = [
    {
      petId: "P1",
      petName: "Dog",
      petType: "Dog",
      petBreed: "Labrador",
      reportDate: "2023-05-01",
      reportedBy: "John Doe",
      reportedTo: "Jane Doe",
      reportedDetails: "Reported details",
    },
    {
      petId: "P2",
      petName: "Cat",
      petType: "Cat",
      petBreed: "Persian",
      reportDate: "2023-05-02",
      reportedBy: "John Doe",
      reportedTo: "Jane Doe",
      reportedDetails: "Reported details",
    },
  ];

  return (
    <div className="backoffice-pets-page-container">
      <div className="backoffice-buttons">
        <Link href="/backoffice/createpet" passHref>
          <button className="btn-add-pet">
            <Plus size={16} /> Add Pet
          </button>
        </Link>
      </div>
      <Table key="pets" headers={petsHeaders} initialData={petsData} />
    </div>
  );
};

export default Page;
