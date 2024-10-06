import React, { useEffect, useState } from "react";
import "./styles/index.css";

const PetSelectFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreedId, setSelectedBreedId] = useState("");

  const options = [
    { value: "", label: "Todos", icon: "🐾" },
    { value: "dog", label: "Cão", icon: "🐶" },
    { value: "cat", label: "Gato", icon: "🐱" },
    { value: "other", label: "Outro", icon: "🦜" },
  ];

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    setSelectedBreedId(""); // Reset selected breed when changing animal type
  };

  useEffect(() => {
    setLoading(true);
    const fetchBreeds = async () => {
      let url;
      switch (selected) {
        case "cat":
          url = "/api/catBreed";
          break;
        case "dog":
          url = "/api/dogBreed";
          break;
        default:
          setBreeds([]);
          setLoading(false);
          return;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API response:", data); // Debug: Log the API response

        // Check if data is an array or has a 'breeds' property
        if (Array.isArray(data)) {
          setBreeds(data);
        } else if (data && Array.isArray(data.breeds)) {
          setBreeds(data.breeds);
        } else {
          console.error("Unexpected data format:", data);
          setBreeds([]);
        }
      } catch (e) {
        console.error("Failed to fetch breeds:", e);
        setBreeds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [selected]);

  const handleBreedInput = (value) => {
    setSelectedBreedId(value);
  };

  return (
    <div>
      <div className="cute-select-container">
        <button
          className={`cute-select-button ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected
            ? options.find((opt) => opt.value === selected).label
            : "Escolha um animal"}
          <span className="cute-select-arrow">▼</span>
        </button>
        {isOpen && (
          <div className="cute-select-options">
            {options.map((option) => (
              <div
                key={option.value}
                className={`cute-select-option ${
                  selected === option.value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="cute-select-icon">{option.icon}</span>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && selected !== "" && selected !== "other" && (
        <div className="cute-select-container ">
          <p>&nbsp;</p>
          <select
            className="cute-select-button"
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            value={selectedBreedId}
            onChange={(e) => handleBreedInput(e.target.value)}
          >
            <option className="cute-select-options" value="">
              Raça...
            </option>
            {Array.isArray(breeds) && breeds.length > 0 ? (
              breeds.map((breed) => (
                <option
                  className="cute-select-option"
                  key={breed.id || breed}
                  value={breed.id || breed}
                >
                  {breed.name || breed}
                </option>
              ))
            ) : (
              <option disabled>No breeds available</option>
            )}
          </select>
        </div>
      )}
    </div>
  );
};

export default PetSelectFilter;
