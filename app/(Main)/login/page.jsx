"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import "./styles/index.css";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push("/");
      } else {
        setErrorMessage(result.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    }
  };
  return (
    <div className="login-container">
      <div className="paw-print-top"></div>
      <div className="container-login">
        <h1 className="title-login">Bem-Vindo ao PetHub</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="paw-print"></div>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="paw-print"></div>
          </div>
          <div className="container-btn-login">
            <button type="submit" className="login-button">
              Entrar
            </button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="links">
          <a href="/register">Não tens conta? Regista aqui</a>
        </div>
      </div>
      <div className="paw-print-bottom"></div>
    </div>
  );
};
export default Page;
