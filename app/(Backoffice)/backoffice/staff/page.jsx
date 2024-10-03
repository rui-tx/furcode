import React from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";
const page = () => {
  const staffHeaders = [
    { prettyLabel: "Staff ID", columnName: "staffId", type: "string" },
    { prettyLabel: "Name", columnName: "name", type: "string" },
    { prettyLabel: "Email", columnName: "email", type: "string" },
    { prettyLabel: "Phone", columnName: "phone", type: "string" },
  ];

  const staffData = [
    {
      staffId: "S1",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123456789",
    },
    {
      staffId: "S2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987654321",
    },
  ];

  return (
    <div className="staff-page-container">
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

export default page;
