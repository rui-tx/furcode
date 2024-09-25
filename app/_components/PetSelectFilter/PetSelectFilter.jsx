import React, { useEffect } from "react";
import "./styles/index.css";
import { useState } from "react";

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
          return;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreeds(data);
      } catch (e) {
        console.error("Failed to fetch breeds:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [selected]);

  const handleBreedInput = async (value) => {
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
            {breeds?.map((breed) => (
              <option
                className="cute-select-option"
                key={breed.id}
                value={breed.id}
              >
                {breed.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default PetSelectFilter;
