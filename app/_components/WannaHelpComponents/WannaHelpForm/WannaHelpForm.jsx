import React from "react";
import WannaHelpSelectForm from "../WannaHelpSelectForm/WannaHelpSelectForm";
import { useState } from "react";

const WannaHelpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    helpType: "",
    message: "",
  });

  const helpOptions = [
    { value: "adotar", label: "Adotar", icon: "🏠" },
    { value: "voluntariar", label: "Voluntariar", icon: "🤝" },
    { value: "doar", label: "Doar", icon: "💰" },
    { value: "apadrinhar", label: "Apadrinhar", icon: "❤️" },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      helpType: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados do formulário:", formData);
  };
  return (
    <form className="wannahelp-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        required
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        required
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="Text"
        name="Shelter"
        placeholder="Shelter"
        required
        onChange={handleInputChange}
      />
      <WannaHelpSelectForm
        options={helpOptions}
        placeholder="Como quer ajudar?"
        value={formData.helpType}
        onChange={handleSelectChange}
      />
      <textarea
        name="message"
        placeholder="Mensagem (opcional)"
        value={formData.message}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" className="wannahelp-form-button">
        Enviar
      </button>
    </form>
  );
};

export default WannaHelpForm;
