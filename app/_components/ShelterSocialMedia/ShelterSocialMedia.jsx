import React from "react";
import "./styles/index.css";

function ShelterSocialMedia({ shelterSocialMedia }) {
  return (
    <div className="one-shelter-social-media-buttons">
      <div className="shelter-send-a-messsage-container">
        <p>Envie-nos uma mensagem</p>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          className="form-control-shelter"
          placeholder="Digite sua mensagem..."
        ></textarea>
      </div>
      <span className="social-media-shelter">
        Siga nos em nossas redes sociais:{shelterSocialMedia}
      </span>
    </div>
  );
}

export default ShelterSocialMedia;
