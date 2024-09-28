"use client";

import { useEffect, useState } from "react";
import { IoColorPaletteOutline, IoScaleOutline } from "react-icons/io5";
import { TbVaccine, TbCalendar, TbRuler3 } from "react-icons/tb";
import ImageUpload from "../../_components/ImageUpload/ImageUpload"; // test image upload
import Modal from "@/app/_components/Modal/Modal";
import Table from "@/app/_components/Table/Table";

import "./styles/index.css";

const Page = ({ params }) => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    const fetchPet = async () => {
      try {
        const response = await fetch("/api/getPet?id=" + params.id);
        if (!response.ok) {
          if (response.status === 404) {
            //setError("Pet not found");
            const test = {
              id: 2,
              name: "Roofie",
              petTypeId: 2,
              shelterId: 3,
              isAdopted: true,
              isVaccinated: true,
              size: "Grande",
              weight: 5.5,
              color: "White",
              age: 3,
              observations: "I love my pet",
              coverImage:
                "https://cloud.ducknexus.com/s/SQbyMzH5EtNCpn6/download/IMG_9245.JPG",
            };
            setPet(test);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setPet(data);
      } catch (e) {
        console.error("Failed to fetch pet data:", e);
        setError("Failed to fetch pet data");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [reload]);

  const showModal = (show) => {
    setIsModalOpen(show);
  };

  const showDeleteModal = (show) => {
    setDeleteModalOpen(show);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteModalOpen(false);
    const newReload = reload + 1;
    setReload(newReload);
  };

  const modalContent = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ImageUpload to="pet" id={pet?.id} />
    </div>
  );

  const tableHeaders = [
    {
      columnName: "id",
      prettyLabel: "ID",
      type: "string",
    },
    {
      columnName: "data",
      prettyLabel: "Image",
      type: "image",
    },
  ];
  const modalContentDelete = (
    <div>
      <Table
        headers={tableHeaders}
        data={pet?.imageList}
        enableEdit={true}
        enableDelete={true}
        deleteEndpoint={`/api/deletePet`}
        currentId={pet?.id}
      />
    </div>
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading screen
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

  return (
    <div className="full-width-container">
      <Modal
        open={isModalOpen}
        onCancel={() => {
          closeModal(false);
        }}
        title="Upload Image"
        content={modalContent}
      />
      <Modal
        open={deleteModalOpen}
        onCancel={() => {
          closeModal(false);
        }}
        title="Delete Image"
        content={modalContentDelete}
      />
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

          <button className="adopt-button">Adota-me!</button>
          <button className="like-button">❤️</button>
          <button className="like-button" onClick={() => showModal(true)}>
            Upload Image
          </button>
          <button className="like-button" onClick={() => showDeleteModal(true)}>
            Delete Image
          </button>
        </div>
      </div>

      <div className="detailed-description">
        <h2>Fotos</h2>
        <div className="image-list">
          {pet.imageList.map((image, index) => (
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
    </div>
  );
};

export default Page;
