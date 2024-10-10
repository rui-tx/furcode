import Table from "@/app/_components/Table/Table";
import React from "react";
import "./styles/index.css";
const Page = () => {
  const donationHeaders = [
    { prettyLabel: "Donation ID", columnName: "donationId", type: "string" },
    { prettyLabel: "Donor Name", columnName: "donorName", type: "string" },
    { prettyLabel: "Amount", columnName: "amount", type: "number" },
    { prettyLabel: "Date", columnName: "date", type: "string" },
    { prettyLabel: "Purpose", columnName: "purpose", type: "string" },
  ];

  const donationData = [
    {
      donationId: "D1",
      donorName: "Alice Smith",
      amount: 100,
      date: "2023-06-01",
      purpose: "General Fund",
    },
    {
      donationId: "D2",
      donorName: "Bob Johnson",
      amount: 50,
      date: "2023-06-15",
      purpose: "Cat Shelter",
    },
    {
      donationId: "D3",
      donorName: "Carol Williams",
      amount: 75,
      date: "2023-07-01",
      purpose: "Dog Food",
    },
  ];

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
