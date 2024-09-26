"use client";

import { useEffect, useState } from "react";
import Table from "../components/Table/Table";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setData(json));

    setLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  const headers = [
    {
      columnName: "id",
      prettyLabel: "ID",
      type: "number",
    },
    {
      columnName: "userId",
      prettyLabel: "User ID",
      type: "string",
    },
    ,
    {
      columnName: "title",
      prettyLabel: "Title",
      type: "text",
    },
    {
      columnName: "completed",
      prettyLabel: "Completed",
      type: "bool",
    },
  ];

  return (
    <div>
      <Table
        headers={headers}
        data={data}
        enableEdit={true}
        enableDelete={false}
      />
    </div>
  );
};

export default Page;
