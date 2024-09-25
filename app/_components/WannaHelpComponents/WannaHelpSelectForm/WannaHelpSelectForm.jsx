"use client";
import React, { useState } from "react";
import "./styles/index.css";

const WannaHelpSelectForm = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="cute-select-container">
      <button
        className={`cute-select-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected
          ? options.find((opt) => opt.value === selected).label
          : placeholder}
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
  );
};

export default WannaHelpSelectForm;
