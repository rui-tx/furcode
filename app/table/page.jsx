"use client";

import { useEffect, useState } from "react";
import Table from "../_components/Table/Table";
import Modal from "../_components/Modal/Modal";
import WannaHelpSelectForm from "../_components/WannaHelpComponents/WannaHelpSelectForm/WannaHelpSelectForm";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    helpType: "",
    message: "",
  });

  const handleData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setData(json));

    setLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  const showModal = (show) => {
    setIsModalOpen(show);
    console.log("Modal is open: ", data);
  };

  const showModal2 = (show) => {
    setIsModalOpen2(show);
  };

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

  const headers = [
    {
      columnName: "id",
      prettyLabel: "ID",
      type: "number",
    },
    {
      columnName: "userId",
      prettyLabel: "User ID",
      type: "string",
    },
    {
      columnName: "title",
      prettyLabel: "Title",
      type: "text",
    },
    {
      columnName: "completed",
      prettyLabel: "Completed",
      type: "bool",
    },
  ];

  const testContent = (
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

  const testContent2 = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src="https://cloud.ducknexus.com/s/SQbyMzH5EtNCpn6/download/IMG_9245.JPG"
        alt="Animal Image"
        style={{
          width: "50%",
          borderRadius: "0.5rem",
        }}
      />
    </div>
  );

  return (
    <div>
      <button onClick={() => showModal(true)}>New Entry</button>
      <button onClick={() => showModal2(true)}>Image Modal</button>
      <Modal
        open={isModalOpen}
        onCancel={() => showModal(false)}
        title="This is test"
        content={testContent}
      />

      <Modal
        open={isModalOpen2}
        onCancel={() => showModal2(false)}
        title="Image Test"
        content={testContent2}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table headers={headers} initialData={data} enableEdit={true} />
      )}
    </div>
  );
};

export default Page;
