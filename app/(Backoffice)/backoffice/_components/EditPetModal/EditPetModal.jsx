import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "./styles/index.css";

const EditPetModal = ({ pet, headers, onSave, onCancel }) => {
  const [editedPet, setEditedPet] = useState(pet);
  const [error, setError] = useState(null);

  const handleInputChange = (e, columnName) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditedPet((prev) => ({ ...prev, [columnName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Saving pet data:", editedPet);
      await onSave(editedPet);
      setError(null);
    } catch (error) {
      console.error("Error saving pet:", error);
      setError(`Failed to save: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onCancel}>
          <FiX />
        </button>
        <h2>Editar Animal</h2>
        <form onSubmit={handleSubmit}>
          {headers.map((header) => (
            <div key={header.columnName} className="form-group">
              <label htmlFor={header.columnName}>{header.prettyLabel}</label>
              {header.type === "bool" ? (
                <input
                  type="checkbox"
                  id={header.columnName}
                  checked={editedPet[header.columnName]}
                  onChange={(e) => handleInputChange(e, header.columnName)}
                />
              ) : (
                <input
                  type="text"
                  id={header.columnName}
                  value={editedPet[header.columnName]}
                  onChange={(e) => handleInputChange(e, header.columnName)}
                />
              )}
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit" className="save-button">
              Guardar
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default EditPetModal;
