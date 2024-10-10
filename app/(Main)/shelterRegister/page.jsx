"use client";

import React, { useState } from "react";
import "./styles/index.css";
import { useAuth } from "../../context/AuthContext";

const Page = () => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    vat: "",
    email: "",
    address1: "",
    address2: "",
    postalCode: "",
    phone: "",
    size: "",
    isActive: "true",
    creationDate: "",
    description: "",
    facebookUrl: "",
    instagramUrl: "",
    webPageUrl: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function createShelter(shelterData) {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.id;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/shelterRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId.toString(),
        },
        body: JSON.stringify(shelterData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create shelter");
      }

      const result = await response.json();

      // Atualiza o localStorage e o estado do contexto Auth com os novos dados
      userData.shelterId = result.id;
      userData.role = "MANAGER";
      localStorage.setItem("user", JSON.stringify(userData));
      console.log(userData);

      // Chama a função updateUser do contexto Auth para refletir as mudanças no estado
      updateUser({ shelterId: result.id, role: "MANAGER" });

      return result;
    } catch (error) {
      console.error("Error creating shelter:", error);
      throw error;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await createShelter(formData);
      console.log("Shelter created:", result);
      setSuccessMessage(
        "Registo efetuado com sucesso! ID do abrigo: " + result.id
      );
      setFormData({
        name: "",
        vat: "",
        email: "",
        address1: "",
        address2: "",
        postalCode: "",
        phone: "",
        size: "",
        isActive: "true",
        creationDate: "",
        description: "",
        facebookUrls: "",
        instagramUrls: "",
        webPageUrls: "",
      });
    } catch (error) {
      console.error("Failed to create shelter:", error.message);
      setErrorMessage(`Erro no registo: ${error.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="shelter-register-container">
        <h2 className="shelter-register-title">Registe a Sua Associação</h2>
        <div className="shelter-register-content-wrapper">
          <div className="shelter-register-image">
            <div className="shelter-register-image-container"></div>
          </div>
          <div className="shelter-register-content">
            <div className="shelter-register-text">
              <p>
                Junte-se à Furcode e faça parte de uma comunidade dedicada a
                encontrar lares para os animais que mais precisam.
              </p>
              <br />
              <p>
                Ao registar a sua associação, estará a dar uma nova oportunidade
                aos nossos amigos de quatro patas, ampliando o alcance das suas
                ações e tornando o processo de adoção ainda mais simples e
                acessível.
              </p>
              <br />
              <p>
                Queremos caminhar ao seu lado na missão de proporcionar novas
                famílias a estes animais.
              </p>
              <br />
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
                    style={{ display: "none" }}
                  />
                  <input
                    type="date"
                    name="creationDate"
                    placeholder="data"
                    onChange={handleChange}
                    value={formData.creationDate}
                    required
                  />
                  <input
                    className="shelter-register-container-input-description"
                    type="text"
                    name="description"
                    placeholder="Escreva uma breve descrição sobre sua associação"
                    onChange={handleChange}
                    value={formData.description}
                    required
                  />
                  <input
                    type="text"
                    name="instagramUrl"
                    placeholder="Instagram URL (opcional)"
                    onChange={handleChange}
                    value={formData.instagramUrl}
                  />
                  <input
                    type="text"
                    name="facebookUrl"
                    placeholder="Facebook URL (opcional)"
                    onChange={handleChange}
                    value={formData.facebookUrl}
                  />
                  <input
                    type="text"
                    name="webPageUrl"
                    placeholder="Web Page URL (opcional)"
                    onChange={handleChange}
                    value={formData.webPageUrl}
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
