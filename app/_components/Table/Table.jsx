"use client";
import { useState } from "react";
import "./styles/index.css";

const Table = ({ headers, data, enableEdit, enableDelete }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [updatedRow, setUpdatedRow] = useState(null);

  const renderValue = (item, header) => {
    const value = item[header.columnName];

    switch (header.type) {
      case "number":
        return value;
      case "string":
        return value ? value.toString() : "";
      case "bool":
        return value ? "Yes" : "No";
      default:
        return value;
    }
  };

  const handleEdit = (id, item) => {
    setUpdatedRow(null); // reset animation when input changes
    setEditingRow(id);
    setEditedData(item);
  };

  const handleInputChange = (e, columnName) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setEditedData({
      ...editedData,
      [columnName]: value,
    });
  };

  const handleSave = () => {
    console.log("Saving data for row: ", editingRow, editedData);
    setUpdatedRow(editingRow); // to show animation when row is updated
    setEditingRow(null);
  };

  const handleDelete = (id) => {
    console.log("Deleting row: ", id);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  return (
    <div className="table-container">
      {/* Header */}
      <div className="row title">
        <ul>
          {headers.map((header, index) => (
            <li key={index}>{header.prettyLabel}</li>
          ))}
          {enableEdit || enableDelete ? <li>Quick Actions</li> : null}
        </ul>
      </div>

      {/* Data Rows */}
      {data.map((item, index) => (
        <div
          className={`row ${updatedRow === item.id ? "update-row" : ""}`}
          key={index}
        >
          <ul>
            {headers.map((header, idx) => (
              <li key={idx}>
                {editingRow === item.id ? (
                  header.type === "bool" ? (
                    <input
                      type="checkbox"
                      checked={editedData[header.columnName]}
                      onChange={(e) => handleInputChange(e, header.columnName)}
                    />
                  ) : header.type === "number" ? (
                    <input
                      type="number"
                      value={editedData[header.columnName]}
                      onChange={(e) => handleInputChange(e, header.columnName)}
                    />
                  ) : header.type === "text" ? (
                    <textarea
                      value={editedData[header.columnName]}
                      rows={4}
                      onChange={(e) => handleInputChange(e, header.columnName)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editedData[header.columnName]}
                      onChange={(e) => handleInputChange(e, header.columnName)}
                    />
                  )
                ) : (
                  renderValue(item, header)
                )}
              </li>
            ))}
            {enableEdit && (
              <li>
                {editingRow === item.id ? (
                  <span>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </span>
                ) : (
                  <button onClick={() => handleEdit(item.id, item)}>
                    Edit
                  </button>
                )}
                {enableDelete && (
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                )}
              </li>
            )}
          </ul>
          <ul className="more-content">
            <li>
              This is a row with more content. It's hidden until hovered. Maybe
              put here more info about the row.
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Table;
