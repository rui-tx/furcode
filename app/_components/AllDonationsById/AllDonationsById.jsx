"use client";   
import React, { use } from "react";

const AllDonationsById = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donations, setDonations] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/donations`, {
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
        console.log("Donations data:", data);
        setDonations(data);
      } catch (e) {
        console.error("Failed to fetch donations data:", e);
        setError("Failed to fetch donations data: " + e.message);
      } finally {
        setLoading(false);
      }
    };
  }),
    [reload];
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return (
    <></>
);

export default AllDonationsById;
