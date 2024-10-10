"use client";
import { useEffect, useState } from "react";
import "./styles/index.css";

const Table = ({
  headers,
  initialData,
  enableEdit,
  enableDelete,
  currentId,
  deleteEndpoint,
  onDataChange,
  onAccept,
  onRefuse,
}) => {
  const [data, setData] = useState(initialData);
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
      case "image":
        return (
          <img
            src={value}
            alt="Mini thumbnail for image"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "0.5rem",
            }}
          />
        );
      default:
        return value;
    }
  };

  const handleEdit = (id, item) => {
    setUpdatedRow(null);
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
    const newData = data.map((item) =>
      item.id === editingRow ? editedData : item
    );
    setData(newData);
    setUpdatedRow(editingRow);
    setEditingRow(null);
    if (onDataChange) onDataChange(newData);
  };

  const handleDelete = async (id) => {
    try {
      const fileName = id.split("/").pop();
      const response = await fetch(
        `${deleteEndpoint}?id=${currentId}&fileName=${fileName}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        if (onDataChange) onDataChange(newData);
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete the item. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleAccept = (id) => {
    if (onAccept) {
      onAccept(id);
    }
  };

  const handleRefuse = (id) => {
    if (onRefuse) {
      onRefuse(id);
    }
  };

  const renderInputField = (header, value) => {
    switch (header.type) {
      case "bool":
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleInputChange(e, header.columnName)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(e, header.columnName)}
          />
        );
      case "text":
        return (
          <textarea
            value={value}
            rows={4}
            onChange={(e) => handleInputChange(e, header.columnName)}
          />
        );
      case "image":
        return (
          <img
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            src={value}
            alt="Editable"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e, header.columnName)}
          />
        );
    }
  };

  return (
    <div className="table-container">
      <div className="row title">
        <ul>
          {headers.map((header, index) => (
            <li key={index}>{header.prettyLabel}</li>
          ))}
          <li>Actions</li>
        </ul>
      </div>

      {data.map((item, index) => (
        <div
          className={`row ${updatedRow === item.id ? "update-row" : ""}`}
          key={item.id}
        >
          <ul>
            {headers.map((header, idx) => (
              <li key={idx}>
                {editingRow === item.id
                  ? renderInputField(header, editedData[header.columnName])
                  : renderValue(item, header)}
              </li>
            ))}
            <li>
              {editingRow === item.id ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  {enableEdit && (
                    <button onClick={() => handleEdit(item.id, item)}>
                      Edit
                    </button>
                  )}
                  {enableDelete && (
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  )}

                  {onAccept && (
                    <button onClick={() => handleAccept(item.id)}>
                      Accept
                    </button>
                  )}
                  {onRefuse && (
                    <button onClick={() => handleRefuse(item.id)}>
                      Refuse
                    </button>
                  )}
                </>
              )}
            </li>
          </ul>
          <ul className="more-content">
            <li></li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Table;
