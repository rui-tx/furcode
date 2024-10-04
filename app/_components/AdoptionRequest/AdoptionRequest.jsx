import React, { useEffect, useState } from "react";

const AdoptionRequest = ({ petId, shelterId, personId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const adoptBody = { shelterId, personId, petId };
    const fetchAdoptionRequest = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        console.log("Sending adoption request with body:", adoptBody);
        const response = await fetch(`/api/adoptionRequest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(adoptBody),
          signal: controller.signal,
        });
        console.log("Response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response text:", errorText);
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }
        const data = await response.json();
        console.log("Successful response data:", data);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Failed to fetch adoption request:", e);
          if (isMounted) setError(e.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAdoptionRequest();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [petId, shelterId, personId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Adoption request submitted successfully!</div>;
};

export default AdoptionRequest;
