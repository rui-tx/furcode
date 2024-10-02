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
      <div className="container-login">
        <div className="title-login">Login</div>
        <form onSubmit={handleSubmit} className="container-form-buttom-input">
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
            <button type="submit">Login</button>
          </div>
        </form>
        {errorMessage && (
          <div className="login-error-message">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="container-no-register">
          <p>
            Não possui conta? <a href="/register">Registar aqui</a>
          </p>
          <p>
            Esqueceu sua senha? <a href="/recovery">Recuperar aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
