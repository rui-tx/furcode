"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

import "./styles/index.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      setSuccessMessage(true);
      router.push("/");
    } catch (error) {
      alert("Login errado");
      setSuccessMessage(false);
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

export default Page;
