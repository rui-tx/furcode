"use client";
import React, { useState } from "react";
import "./styles/index.css";

const page = () => {
  const [name, setName] = useState("");
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [size, setSize] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleNif = (event) => {
    setNif(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handlePostalCode = (event) => {
    setPostalCode(event.target.value);
  };

  const handleCellNumber = (event) => {
    setCellNumber(event.target.value);
  };

  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      name,
      nif,
      email,
      password,
      address,
      postalCode,
      cellNumber,
      size
    );
  };
  const handleRegister = async () => {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        nif: nif,
        email: email,
        address: address,
        postalCode: postalCode,
        cellNumber: cellNumber,
        size: size,
      }),
    });

    console.log(response);
    if (response.ok) {
      setSuccessMessage(true);
    }
  };

  return (
    <div className="shelter-register-container">
      <h2 className="shelter-register-title">Registe a Sua Associação</h2>
      <div className="shelter-register-text"></div>
      <div className="shelter-register-container-register">
        <div className="shelter-register-container-input">
          <input
            type="text"
            placeholder="Nome"
            onChange={handleName}
            value={name}
            required
          />
          <input
            type="number"
            placeholder="NIF"
            onChange={handleNif}
            value={nif}
            required
          />
          <input
            type="text"
            placeholder="Email"
            onChange={handleEmail}
            value={email}
            required
          />
          <input
            type="text"
            placeholder="Direção"
            onChange={handleAddress}
            value={address}
            required
          />
          <input
            type="number"
            placeholder="Código Postal"
            onChange={handlePostalCode}
            value={postalCode}
            required
          />
          <input
            type="number"
            placeholder="Telefone"
            onChange={handleCellNumber}
            value={cellNumber}
            required
          />
          <input
            type="number"
            placeholder="Tamanho (m²)"
            onChange={handleSize}
            value={size}
            required
          />
        </div>

        <div className="shelter-register-container-button">
          <button
            type="submit"
            onSubmit={handleSubmit}
            onClick={handleRegister}
          >
            Registar
          </button>
        </div>
        {successMessage && (
          <div className="shelter-register-success-message">
            <p>Registado com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
