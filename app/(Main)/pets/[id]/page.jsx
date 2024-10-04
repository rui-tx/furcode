"use client";

import { useEffect, useState } from "react";
import { IoColorPaletteOutline, IoScaleOutline } from "react-icons/io5";
import { TbVaccine, TbCalendar, TbRuler3 } from "react-icons/tb";
import "./styles/index.css";
import Modal from "../../../_components/Modal/Modal";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import AdoptionRequest from "../../../_components/AdoptionRequest/AdoptionRequest";


const Page = ({ params, petId, shelterId, personId }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adopted, setAdopted] = useState(false);
  const { user } = useAuth();
  const [showAdoptionRequest, setShowAdoptionRequest] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    address: "",
    phonenumber: "",
    email: "",
    whyAdopt: "",
    othersPets: "",
    describe: "",
    houseType: "",
    comments: "",
  });

  useEffect(() => {
    if (user) {
      const firstName = user.firstName || "";
      const lastName = user.lastName || "";
      const address1 = user.address1 || "";
      const address2 = user.address2 || "";
      const cellPhone = user.cellPhone || "";
      const email = user.email || "";

      setFormData({
        fullname: `${firstName} ${lastName}`,
        address: `${address1} ${address2}`,
        phonenumber: cellPhone,
        email: email,
        age: formData.age,
        whyAdopt: formData.whyAdopt,
        othersPets: formData.othersPets,
        describe: formData.describe,
        houseType: formData.houseType,
        comments: formData.comments,
      });
    }
  }, [user]);

  const handleAdoptButton = () => {
    showModal(true);
  };

  const showModal = (show) => {
    setIsModalOpen(show);
  };

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/onePet/onePet/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Pet not found");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Pet data:", data);
        setPet(data);
      } catch (e) {
        console.error("Failed to fetch pet data:", e);
        setError("Failed to fetch pet data: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [params.id, reload]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickToLogin = () => {
    router.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    showModal(false);
    setShowAdoptionRequest(true);
    console.log("Adoption submitted:", true);
  };

  const modalContent = (
    <form className="total-modal-adoption" onSubmit={handleSubmit}>
      <h2>Parabéns, o seu pedido foi enviado com sucesso!</h2>
      <p>Você será notificado quando o animal estiver pronto.</p>
      <button type="submit" className="adoption-form-button">Confirmar Adoção</button> 
    </form>
  );

  // const modalContent = (
  //   <div className="total-modal-adoption">
  //     <form className="adoption-form" onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="fullname"
  //         placeholder="Nome completo"
  //         required
  //         value={formData.fullname}
  //         onChange={handleInputChange}
  //       />
  //       <input
  //         type="number"
  //         name="age"
  //         placeholder="Idade"
  //         required
  //         value={formData.age}
  //         onChange={handleInputChange}
  //       />
  //       <input
  //         type="text"
  //         name="address"
  //         placeholder="Morada"
  //         required
  //         value={formData.address}
  //         onChange={handleInputChange}
  //       />
  //       <input
  //         type="tel"
  //         name="phonenumber"
  //         placeholder="Número de telefone"
  //         required
  //         value={formData.phonenumber}
  //         onChange={handleInputChange}
  //       />
  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="E-mail"
  //         required
  //         value={formData.email}
  //         onChange={handleInputChange}
  //       />
  //       <textarea
  //         name="whyAdopt"
  //         placeholder="Por que deseja adotar?"
  //         required
  //         value={formData.whyAdopt}
  //         onChange={handleInputChange}
  //       ></textarea>
  //       <input
  //         type="text"
  //         name="othersPets"
  //         placeholder="Outros animais de estimação (se houver)"
  //         value={formData.othersPets}
  //         onChange={handleInputChange}
  //       />
  //       <textarea
  //         name="describe"
  //         placeholder="Descreva o tipo de animal que deseja adotar"
  //         required
  //         value={formData.describe}
  //         onChange={handleInputChange}
  //       ></textarea>
  //       <input
  //         type="text"
  //         name="houseType"
  //         placeholder="Tipo de moradia (casa, apartamento, etc.)"
  //         required
  //         value={formData.houseType}
  //         onChange={handleInputChange}
  //       />
  //       <textarea
  //         name="comments"
  //         placeholder="Comentários (opcional)"
  //         value={formData.comments}
  //         onChange={handleInputChange}
  //       ></textarea>
  //       <button type="submit" className="adoption-form-button">
  //         Enviar
  //       </button>
  //     </form>
  //   </div>
  // );

  const modalContent2 = (
    <div className="container-adoption-modal">
      <h2 className="container-adoption-modal-title">
        Para adotar, é necessário estar logado. Clique no botão abaixo para
        continuar.
      </h2>
      <button
        className="container-adoption-modal-button"
        onClick={handleClickToLogin}
      >
        Login
      </button>
    </div>
  );

  return (
    <div className="full-width-container">
      <div className="pet-container">
        <div className="pet-image-section">
          <img
            src={pet.coverImage}
            alt="Animal Image"
            className="animal-image"
          />
        </div>

        <div className="pet-description-section">
          <h1>{pet.name}</h1>
          <span>
            <TbRuler3 />
            &nbsp;
            <strong>Tamanho:&nbsp;</strong> {pet.size}
          </span>
          <span>
            <IoScaleOutline />
            &nbsp;
            <strong>Peso:&nbsp;</strong> {pet.weight} kgs
          </span>

          <span>
            <IoColorPaletteOutline />
            &nbsp;
            <strong>Cor:&nbsp;</strong> {pet.color}
          </span>
          <span>
            <TbCalendar />
            &nbsp;
            <strong>Idade:&nbsp;</strong>
            {pet.age} anos
          </span>
          <span>
            <TbVaccine />
            &nbsp;
            <strong>Vacinado:&nbsp;</strong>
            {pet.isVaccinated ? " Sim" : " Não"}
          </span>

          <button className="adopt-button" onClick={handleAdoptButton}>
            Adota-me!
          </button>
          <button className="like-button">❤️</button>
        </div>
      </div>

      {pet.imageList?.length > 0 && (
        <div className="detailed-description">
          <h2>Fotos</h2>
          <div className="image-list">
            {pet.imageList?.map((image, index) => (
              <p key={index}>
                <img
                  src={image.data}
                  alt="Animal Image"
                  className="animal-image"
                />
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="detailed-description">
        <h2>Sobre {pet.name}</h2>
        <p>{pet?.observations}</p>
      </div>

      <div className="detailed-description">
        <h2>
          Sobre o abrigo <strong>Pet Home</strong>
        </h2>
        <p>
          O abrigo Pet Home é um espaço de lazer para animais de estimação
          maravilhosos. Ele é um lugar onde você pode se divertir e se divertir
          com seus animais favoritos. Não perca mais tempo procurando por um
          abrigo para seu animal favorito.
        </p>
      </div>

      <div className="detailed-description">
        <h2>Localização do abrigo</h2>
        <p>mapa aqui</p>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => showModal(false)}
        title="Formulário de Adoção"
        content={isLoggedIn ? modalContent : modalContent2}
      />

      {showAdoptionRequest && (
        <AdoptionRequest
          shelterId={pet?.shelterId}
          personId={user?.id}
          petId={pet.id}
        />
      )}
    </div>
  );
};

export default Page;
