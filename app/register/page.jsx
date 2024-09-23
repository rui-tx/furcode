"use client";
import React, { useState } from "react";
import "./styles/index.css";

const page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cellNumber, setCellNumber] = useState("");

const handleRegister = (e) => {
  e.preventDefault();
  console.log(firstName, lastName, nif, email, password, address1, address2, postalCode, cellNumber);
}

  return (
    <div className="container-r">
      <div className="container-register">
        <div className="title-register">Register</div>

        <div className="container-register-input">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="NIF"
            onChange={(e) => setNif(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address 1"
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address 2"
            onChange={(e) => setAddress2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cell Number"
            onChange={(e) => setCellNumber(e.target.value)}
          />
        </div>

        <div className="container-button-register">
          <button type="submit" onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default page;
