import React, { useState } from "react";
import "./styles/index.css";
import PetSelectFilter from "../PetSelectFilter/PetSelectFilter";

const FilterSidebar = () => {
  const [ageRange, setAgeRange] = useState(0);

  const handleRangeChange = (event) => {
    setAgeRange(event.target.value);
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Filtros</h3>

      <div className="filter-group">
        <PetSelectFilter />
      </div>

      <div className="filter-group">
        <label className="filter-label">Idade Máxima</label>
        <div className="range-container">
          <input
            type="range"
            min="0"
            max="20"
            value={ageRange}
            onChange={handleRangeChange}
            className="filter-range"
          />
          <span className="range-value">{ageRange} anos</span>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Porte</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" /> Pequeno
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> Médio
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> Grande
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
