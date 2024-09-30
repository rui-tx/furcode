"use client";
import React, { useState } from "react";
import "./styles/index.css";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    nif: "",
    email: "",
    address: "",
    postalCode: "",
    cellPhone: "",
    size: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(true);
        setFormData({
          name: "",
          nif: "",
          email: "",
          address: "",
          postalCode: "",
          cellPhone: "",
          size: "",
        });
      } else {
        console.error("Registration Failed");
      }
    } catch (error) {
      console.error("Error submiting form:", error);
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
                    type="number"
                    name="nif"
                    placeholder="NIF"
                    onChange={handleChange}
                    value={formData.nif}
                    required
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Direção"
                    onChange={handleChange}
                    value={formData.address}
                    required
                  />
                  <input
                    type="number"
                    name="postalCode"
                    placeholder="Código Postal"
                    onChange={handleChange}
                    value={formData.postalCode}
                    required
                  />
                  <input
                    type="number"
                    name="cellPhone"
                    placeholder="Telefone"
                    onChange={handleChange}
                    value={formData.cellPhone}
                    required
                  />
                  <input
                    type="number"
                    name="size"
                    placeholder="Tamanho (m²)"
                    onChange={handleChange}
                    value={formData.size}
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
            <p>Registado com sucesso!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
