"use client";
import React, { useState } from "react";
import "./styles/index.css";
const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (
      !firstName ||
      !lastName ||
      !nif ||
      !email ||
      !password ||
      !address1 ||
      !postalCode ||
      !cellNumber
    ) {
      setErrorMessage("All fields except Address 2 are required");
      return false;
    }
    if (password.length < 6 || password.length > 100) {
      setErrorMessage("Password must be between 6 and 100 characters");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (isNaN(nif) || isNaN(postalCode) || isNaN(cellNumber)) {
      setErrorMessage("NIF, Postal Code, and Cell Phone must be numbers");
      return false;
    }
    return true;
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const userData = {
      firstName,
      lastName,
      nif: BigInt(nif),
      email,
      password,
      address1,
      address2: address2 || null,
      postalCode: BigInt(postalCode),
      cellPhone: BigInt(cellNumber),
    };
    console.log("Sending user data:", userData);
    try {
      const response = await fetch("/api/userRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        ),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(true);
      } else {
        console.error("Registration failed:", data);
        setErrorMessage(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

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
    setErrorMessage(false);
  };

  const handleConfirmPassword = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password !== newConfirmPassword) {
      setErrorMessage(
        "As senhas não coincidem. Por favor, verifique e tente novamente."
      );
    } else {
      setErrorMessage(false);
    }
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
  return (
    <div className="container-r">
      <div className="container-form-total">
        <div className="container-register">
          <div className="title-register">Registar</div>
          <form onSubmit={handleRegister} className="container-register-input">
            <input
              type="text"
              placeholder="Nome"
              value={firstName}
              onChange={handleFirstName}
              required
            />
            <input
              type="text"
              placeholder="Apelido"
              value={lastName}
              onChange={handleLastName}
              required
            />
            <input
              type="number"
              placeholder="NIF"
              value={nif}
              onChange={handleNif}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              required
              minLength="6"
              maxLength="100"
            />

            <input
              type="password"
              placeholder="Confirme sua password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
              minLength="6"
              maxLength="100"
            />
            <input
              type="text"
              placeholder="Morada 1"
              value={address1}
              onChange={handleAddress1}
              required
            />
            <input
              type="text"
              placeholder="Morada 2"
              value={address2}
              onChange={handleAddress2}
            />
            <input
              type="number"
              placeholder="Código Postal"
              value={postalCode}
              onChange={handlePostalCode}
              required
            />
            <input
              type="number"
              placeholder="Telemóvel"
              value={cellNumber}
              onChange={handleCellNumber}
              required
            />
            <div className="container-button-register">
              <button type="submit" className="btn-register">
                Registar
              </button>
            </div>
          </form>
          {successMessage && (
            <div className="register-success-message">
              <p>Registado com sucesso!</p>
            </div>
          )}

          <p className="register-error-message">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};
export default Page;
