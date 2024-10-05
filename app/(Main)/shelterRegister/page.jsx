"use client";

import React, { useState } from "react";
import "./styles/index.css";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "nome",
    vat: "1",
    email: "q@c.com",
    address1: "address1",
    address2: "address2",
    postalCode: "2",
    phone: "3",
    size: "4",
    isActive: "true",
    creationDate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage(
        "É necessário fazer o login para registar a sua associação."
      );
      return;
    }

    try {
      const response = await fetch("/api/shelterRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log("Received response:", JSON.stringify(result, null, 2));

      if (response.ok) {
        setSuccessMessage("Registo efetuado com sucesso!");
        setFormData({
          name: "",
          vat: "",
          email: "",
          address1: "",
          address2: "",
          postalCode: "",
          phone: "",
          size: "",
          isActive: "",
          creationDate: "",
        });
      } else {
        setErrorMessage(
          `Erro no registo: ${result.error || "Erro desconhecido"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(`Erro ao enviar o formulário: ${error.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="shelter-register-container">
        <h2 className="shelter-register-title">Registe a Sua Associação</h2>
        <div className="shelter-register-content-wrapper">
          <div className="shelter-register-content">
            <div className="shelter-register-text">
              <p>
                Junte-se à Furcode e faça parte de uma comunidade dedicada a
                encontrar lares para os animais que mais precisam.
              </p>
              <p>
                Ao registar a sua associação, estará a dar uma nova oportunidade
                aos nossos amigos de quatro patas, ampliando o alcance das suas
                ações e tornando o processo de adoção ainda mais simples e
                acessível.
              </p>
              <p>
                Queremos caminhar ao seu lado na missão de proporcionar novas
                famílias a estes animais.
              </p>
              <p>Registe a sua associação e ajude-nos a fazer a diferença!</p>
            </div>
            <div className="shelter-register-form-wrapper">
              <form
                className="shelter-register-container-register"
                onSubmit={handleSubmit}
              >
                <div className="shelter-register-container-input">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                  <input
                    type="text"
                    name="vat"
                    placeholder="NIF"
                    onChange={handleChange}
                    value={formData.vat}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                  <input
                    type="text"
                    name="address1"
                    placeholder="Endereço"
                    onChange={handleChange}
                    value={formData.address1}
                    required
                  />
                  <input
                    type="text"
                    name="address2"
                    placeholder="Endereço"
                    onChange={handleChange}
                    value={formData.address2}
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Código Postal"
                    onChange={handleChange}
                    value={formData.postalCode}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                  />
                  <input
                    type="text"
                    name="size"
                    placeholder="Tamanho (m²)"
                    onChange={handleChange}
                    value={formData.size}
                    required
                  />
                   <input
                    type="text"
                    name="isActive"
                    placeholder="Ativo"
                    onChange={handleChange}
                    value={formData.isActive}
                    disabled
                    style={{display:"none"}}
                  />
                   <input
                    type="date"
                    name="creationDate"
                    placeholder="data"
                    onChange={handleChange}
                    value={formData.creationDate}
                    required
                  />
                </div>
                <div className="shelter-register-container-button">
                  <button type="submit">Registar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {successMessage && (
          <div className="shelter-register-success-message">
            <pre>{successMessage}</pre>
          </div>
        )}
        {errorMessage && (
          <div className="shelter-register-error-message">
            <pre>{errorMessage}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
