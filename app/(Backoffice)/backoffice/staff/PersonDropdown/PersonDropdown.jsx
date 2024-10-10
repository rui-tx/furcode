import React, { useState, useEffect } from "react";
const PersonDropdown = ({ onSelectPerson }) => {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPersons = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/getAllPersons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch persons");
        }
        const data = await response.json();
        setPersons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersons();
  }, []);
  if (isLoading) return <div>Loading persons...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <select onChange={(e) => onSelectPerson(JSON.parse(e.target.value))}>
      <option value="">Select a person</option>
      {persons.map((person) => (
        <option key={person.id} value={JSON.stringify(person)}>
          {person.firstName} {person.lastName} ({person.email})
        </option>
      ))}
    </select>
  );
};
export default PersonDropdown;
