"use client";

import React, { useState } from "react";
import "./styles/index.css";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const response = await fetch(
      "https://66f1d528415379191552511e.mockapi.io/api/v1/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    console.log(response);
    if (response.ok) {
      setSuccessMessage(true);
    }
  };

  return (
    <div className="login-container">
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
          <button type="submit" onSubmit={handleSubmit} onClick={handleLogin}>
            Login
          </button>
        </div>
        {successMessage ? (
          <div className="login-success-message">
            <p>Login realizado com sucesso!</p>
          </div>
        ) : (
          <div className="container-no-register">
            <p>
              Não possui conta? <a href="/register">Registar aqui</a>
            </p>
            <p>
              Esqueceu sua senha? <a href="/recovery">Recuperar aqui</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
