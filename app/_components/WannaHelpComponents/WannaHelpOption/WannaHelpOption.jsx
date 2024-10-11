import React from "react";
import "./styles/index.css";

const WannaHelpOption = ({ title, description, image }) => {
  const imageSrc =
    typeof image === "object" && image.default ? image.default : image;

  const handleClick = () => {
    if (title === "Adotar") {
      window.location.href = "/pets";
    } else if (title === "Voluntariar") {
      window.location.href = "/login";
    } else if (title === "Doar") {
      window.location.href = "/donation";
    }
  };

  return (
    <div className="help-option">
      <img src={imageSrc} alt={title} className="help-image" />
      <div className="wanna-help-text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button className="button-help" onClick={handleClick}>
        Quero Ajudar!
      </button>
    </div>
  );
};

export default WannaHelpOption;
