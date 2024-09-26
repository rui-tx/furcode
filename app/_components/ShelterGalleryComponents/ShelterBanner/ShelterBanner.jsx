import React from "react";
import "./styles/index.css";

const ShelterBanner = () => {
  return (
    <div className="shelter-banner">
      <h1>Encontre um abrigo para ajudar</h1>
      <p>
        Estes abrigos incríveis estão a fazer a diferença para os animais
        necessitados
      </p>
      <div className="shelter-upper-text">
        <h2>
          Apoie um abrigo ou registe o seu <a href="/shelterRegister"> aqui </a>{" "}
          !
        </h2>
      </div>
    </div>
  );
};

export default ShelterBanner;
