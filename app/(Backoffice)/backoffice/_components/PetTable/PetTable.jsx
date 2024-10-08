import React, { useState } from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const PetTable = ({ pets, headers, onSave, onDelete }) => {
  const [editingPet, setEditingPet] = useState(null);
  const [error, setError] = useState(null);

  const handleEdit = (id, pet) => {
    setEditingPet({ id, ...pet });
    setError(null);
  };

  const handleSave = async () => {
    if (editingPet) {
      try {
        await onSave(editingPet);
        setEditingPet(null);
        setError(null);
      } catch (error) {
        setError(`Failed to save: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    setEditingPet(null);
    setError(null);
  };

  const handleInputChange = (e, columnName) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditingPet((prev) => ({ ...prev, [columnName]: value }));
  };

  const renderEditableRow = (pet) => {
    return headers.map((header) => (
      <td key={header.columnName}>
        {header.type === "bool" ? (
          <input
            type="checkbox"
            checked={editingPet[header.columnName]}
            onChange={(e) => handleInputChange(e, header.columnName)}
          />
        ) : (
          <input
            type="text"
            value={editingPet[header.columnName]}
            onChange={(e) => handleInputChange(e, header.columnName)}
          />
        )}
      </td>
    ));
  };

  return (
    <div className="pet-table-container">
      <div className="pet-table-header">
        <h2 className="pet-table-title">Pet Adoption Backoffice</h2>
      </div>
      <table className="pet-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.columnName}>{header.prettyLabel}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              {editingPet && editingPet.id === pet.id ? (
                <>
                  {renderEditableRow(pet)}
                  <td>
                    <button className="save-button" onClick={handleSave}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {headers.map((header) => (
                    <td key={header.columnName}>
                      {header.type === "bool"
                        ? pet[header.columnName]
                          ? "Yes"
                          : "No"
                        : pet[header.columnName]}
                    </td>
                  ))}
                  <td className="pet-table-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(pet.id, pet)}
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => onDelete(pet.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PetTable;
