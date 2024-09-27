"use client";
import React, { useState } from "react";
import "./styles/index.css";

const Page = () => {
  const [firstName, setFirstName] = useState("firstName 1");
  const [lastName, setLastName] = useState("lastName 1");
  const [nif, setNif] = useState("38");
  const [email, setEmail] = useState("Email 1");
  const [password, setPassword] = useState("Password 1");
  const [confirmPassword, setConfirmPassword] = useState("ConfirmPassword 1");
  const [address1, setAddress1] = useState("Address1 1");
  const [address2, setAddress2] = useState("Address2 1");
  const [postalCode, setPostalCode] = useState("11");
  const [cellNumber, setCellNumber] = useState("18");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleNif = (event) => {
    setNif(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleAddress1 = (event) => {
    setAddress1(event.target.value);
  };

  const handleAddress2 = (event) => {
    setAddress2(event.target.value);
  };

  const handlePostalCode = (event) => {
    setPostalCode(event.target.value);
  };

  const handleCellNumber = (event) => {
    setCellNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      firstName,
      lastName,
      nif,
      email,
      password,
      address1,
      address2,
      postalCode,
      cellNumber
    );
  };
  const handleRegister = async () => {
    const response = await fetch(
      "https://66f1d528415379191552511e.mockapi.io/api/v1/person",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          nif: nif,
          email: email,
          password: password,
          address1: address1,
          address2: address2,
          postalCode: postalCode,
          cellNumber: cellNumber,
        }),
      }
    );

    console.log(response);
    if (response.ok) {
      setSuccessMessage(true);
    }
  };

  return (
    <div className="container-r">
      <div className="container-register">
        <div className="title-register">Registar</div>

        <div className="container-register-input">
          <input
            type="text"
            placeholder="Nome"
            onChange={handleFirstName}
            value={firstName}
            required
          />
          <input
            type="text"
            placeholder="Apelido"
            onChange={handleLastName}
            value={lastName}
            required
          />
          <input
            type="number"
            placeholder="NIF"
            onChange={handleNif}
            value={nif}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={handleEmail}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
            value={password}
            required
          />
          <input
            type="password"
            placeholder="Confirme a Password"
            onChange={handleConfirmPassword}
            value={confirmPassword}
            required
          />
          <input
            type="text"
            placeholder="Morada 1"
            onChange={handleAddress1}
            value={address1}
            required
          />
          <input
            type="text"
            placeholder="Morada 2"
            onChange={handleAddress2}
            value={address2}
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
            placeholder="Telemóvel"
            onChange={handleCellNumber}
            value={cellNumber}
          />
        </div>

        <div className="container-button-register">
          <button
            type="submit"
            onSubmit={handleSubmit}
            onClick={handleRegister}
          >
            Registar
          </button>
        </div>
        {successMessage && (
          <div className="register-success-message">
            <p>Registado com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
