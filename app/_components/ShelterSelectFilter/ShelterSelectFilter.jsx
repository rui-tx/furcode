import React, { useEffect, useState, useRef, useCallback } from "react";
import "./styles/index.css";

const ShelterSelectFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShelterId, setSelectedShelterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [shelters, setShelters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const shelterPerPage = 10;
  const dropdownRef = useRef(null);

  const fetchShelters = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `/api/shelterGallery?page=${currentPage}&limit=${shelterPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setShelters((prevShelters) => {
          const newShelters = data.filter(
            (newShelter) => !prevShelters.some((shelter) => shelter.id === newShelter.id)
          );
          return [...prevShelters, ...newShelters];
        });
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching shelters:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  useEffect(() => {
    if (isOpen && shelters.length === 0) {
      fetchShelters();
    }
  }, [isOpen, shelters.length, fetchShelters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("Clicking outside, closing dropdown");
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value) => {
    console.log("Selecting shelter:", value);
    setSelectedShelterId(value);
    setIsOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggling dropdown. Current state:", isOpen);
    setIsOpen((prevState) => !prevState);
  };

  console.log("Render: isOpen =", isOpen, "selectedShelterId =", selectedShelterId);

  return (
    <div className="shelter-select-filter">
      <div className="cute-select-container-donation" ref={dropdownRef}>
        <button
          className={`cute-select-donation-button ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          {selectedShelterId
            ? shelters.find((shelter) => shelter.id === selectedShelterId)?.name
            : "Escolha um abrigo"}
          <span className="cute-select-donation-arrow">▼</span>
        </button>
        {isOpen && (
          <div 
            className="cute-select-donation-options" 
            onClick={(e) => e.stopPropagation()}
          >
            {shelters.length === 0 && loading && <div>Loading...</div>}
            {shelters.map((shelter) => (
              <div
                key={shelter.id}
                className={`cute-select-donation-option ${
                  selectedShelterId === shelter.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(shelter.id)}
              >
                {shelter.name}
              </div>
            ))}
            {!loading && hasMore && (
              <div onClick={(e) => { e.stopPropagation(); fetchShelters(); }}>
                Load more
              </div>
            )}
          </div>
        )}
      </div>
      {selectedShelterId && (
        <div className="shelter-info">
          <p>
            Abrigo selecionado:{" "}
            {shelters.find((s) => s.id === selectedShelterId)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShelterSelectFilter;