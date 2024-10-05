import React, { useState, useEffect } from "react";

const Person = ({ id, onNameFetched }) => {
  const [personName, setPersonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPerson = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/person/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPersonName(data.name);
        onNameFetched(data.name);
      } catch (e) {
        console.error("Failed to fetch person data:", e);
        setError("Failed to fetch person data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id, onNameFetched]);

  if (loading) return null;
  if (error) return <div>Error: {error}</div>;
  return null;
};

export default Person;
