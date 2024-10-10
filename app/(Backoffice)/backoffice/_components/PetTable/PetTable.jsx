import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditPetModal from "../EditPetModal/EditPetModal";
import "./styles/index.css";

const PetTable = ({ pets, headers, onSave, onDelete }) => {
  const [editingPet, setEditingPet] = useState(null);
  const [error, setError] = useState(null);

  const handleEdit = (pet) => {
    setEditingPet(pet);
  };

  const handleSave = async (editedPet) => {
    try {
      await onSave(editedPet);
      setEditingPet(null);
      setError(null);
    } catch (error) {
      setError(`Failed to save: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditingPet(null);
    setError(null);
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
                <button className="edit-button" onClick={() => handleEdit(pet)}>
                  <FiEdit /> Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(pet.id)}
                >
                  <FiTrash2 /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingPet && (
        <EditPetModal
          pet={editingPet}
          headers={headers}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PetTable;
