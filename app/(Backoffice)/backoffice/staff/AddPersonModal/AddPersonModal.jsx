import React, { useState } from "react";

const AddPersonModal = ({ onClose, onAddPerson }) => {
  const [personData, setPersonData] = useState({
    firstName: "",
    lastName: "",
    nif: "",
    email: "",
    password: "",
    address1: "",
    address2: "",
    postalCode: "",
    cellPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPerson(personData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Person to Shelter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={personData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={personData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="nif"
            value={personData.nif}
            onChange={handleChange}
            placeholder="NIF"
            required
          />
          <input
            type="email"
            name="email"
            value={personData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={personData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="text"
            name="address1"
            value={personData.address1}
            onChange={handleChange}
            placeholder="Address 1"
            required
          />
          <input
            type="text"
            name="address2"
            value={personData.address2}
            onChange={handleChange}
            placeholder="Address 2"
          />
          <input
            type="text"
            name="postalCode"
            value={personData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required
          />
          <input
            type="tel"
            name="cellPhone"
            value={personData.cellPhone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <button type="submit">Adicionar Pessoa</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
