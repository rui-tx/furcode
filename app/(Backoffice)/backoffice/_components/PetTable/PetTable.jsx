import React, { useState } from "react";
import Table from "@/app/_components/Table/Table";
import "./styles/index.css";

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
    <div className="custom-table-container">
      <table>
        <thead className="custom-table-title">
          <tr className="custom-table-row">
            {headers.map((header) => (
              <th key={header.columnName}>{header.prettyLabel}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="custom-table-row">
              {editingPet && editingPet.id === pet.id ? (
                <>
                  {renderEditableRow(pet)}
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
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
                  <td>
                    <button onClick={() => handleEdit(pet.id, pet)}>
                      Edit
                    </button>
                    <button onClick={() => onDelete(pet.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="custom-table-error">{error}</div>}
    </div>
  );
};

export default PetTable;
