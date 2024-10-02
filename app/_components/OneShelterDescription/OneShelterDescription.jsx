import "./styles/index.css";
import Modal from "../Modal/Modal";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

function OneShelterDescription({ shelterHistory }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  const handleVolunteerClick = () => {
    showModal(true);
  };

  const showModal = (show) => {
    setIsModalOpen(show);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    showModal(false);
  };

  const modalContent = (
    <div className="total-modal-volunteer">
      <form className="volunteer-form" onSubmit={handleSubmit}>
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
          type="date"
          name="startDate"
          placeholder="Data de início"
          required
          value={formData.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="Data de término"
          required
          value={formData.endDate}
          onChange={handleInputChange}
        />
        <textarea
          name="message"
          placeholder="Mensagem (opcional)"
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="volunteer-form-button">
          Enviar
        </button>
      </form>
    </div>
  );

  const handleClickToLogin = () => {
    router.push("/login");
  };

  const modalContent2 = (
    <div className="container-volunteer-not-logged">
      <h2 className="container-volunteer-not-logged-title">
        Para se voluntariar, é necessário estar logado. Clique no botão abaixo
        para continuar.
      </h2>
      <button
        className="container-volunteer-not-logged-button"
        onClick={handleClickToLogin}
      >
        Login
      </button>
    </div>
  );

  return (
    <div className="one-shelter-container-description">
      <h2 className="one-shelter-description-title">História</h2>
      <p className="one-shelter-description-text">{shelterHistory}</p>
      <div className="one-shelter-social-media">
        <div className="one-shelter-volunteer">
          <button
            className="one-shelter-volunteer-button"
            onClick={handleVolunteerClick}
          >
            Voluntariar
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => showModal(false)}
        title="Formulário de Voluntariado"
        content={isLoggedIn ? modalContent : modalContent2}
      />
    </div>
  );
}

export default OneShelterDescription;
