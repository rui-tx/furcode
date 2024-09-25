"use client";
import React, { useState } from "react";
import "./styles/index.css";
import WannaHelpSelectForm from "../WannaHelpSelectForm/WannaHelpSelectForm";
import WannaHelpOption from "../WannaHelpOption/WannaHelpOption";
import WannaHelpSectionStats from "../WannaHelpSectionStats/WannaHelpSectionStats";
import adoptpic from "../../../_images/adoptpic.jpg";
import donatepic from "../../../_images/donatepic.webp";
import volunteerpic from "../../../_images/volunteerpic.jpg";
import sponsorpic from "../../../_images/sponsorpic.jpg";

console.log("adoptpic:", adoptpic);
const WannaHelp = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  return (
    <div className="wannahelp-container">
      <h1>Queres ajudar os nossos amigos peludos?</h1>
      <WannaHelpSectionStats />
      <div className="wannahelp-introduction">
        Juntos, podemos fazer a diferença na vida de muitos animais! Há várias
        maneiras de ajudar:
      </div>
      <div className="wannahelp-cards-options">
        <WannaHelpOption
          title="Adotar"
          description="Dê um lar amoroso a um animal necessitado. A adoção muda duas vidas: a sua e a do animal!"
          image={adoptpic.src}
        />
        <WannaHelpOption
          title="Voluntariar"
          description="Doe seu tempo e carinho. Precisamos de ajuda para cuidar, passear e socializar os animais."
          image={volunteerpic.src}
        />
        <WannaHelpOption
          title="Doar"
          description="Sua doação ajuda a fornecer comida, abrigo e cuidados médicos aos animais resgatados."
          image={donatepic.src}
        />
        <WannaHelpOption
          title="Apadrinhar"
          description="Não pode adotar? Apadrinhe um animal e ajude com seus cuidados mensais!"
          image={sponsorpic.src}
        />
      </div>
      <div className="wannahelp-contact">
        <h2>Inscreva-se para Ajudar</h2>
        <p>
          Deixe-nos seus dados e entraremos em contato com mais informações
          sobre como você pode ajudar!
        </p>
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
      </div>
    </div>
  );
};

export default WannaHelp;
