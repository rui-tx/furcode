"use client";

import React, { useState } from "react";
import "./styles/index.css";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="title-login">Login</div>
        <div className="container-input">
          <input
            type="text"
            placeholder="Email"
            onChange={handleEmail}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
            required
          />
        </div>
        <div className="container-button">
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
