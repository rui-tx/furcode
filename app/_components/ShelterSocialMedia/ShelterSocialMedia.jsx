import React from "react";
import "./styles/index.css";

function ShelterSocialMedia({ shelterSocialMedia }) {
  return (
    <div className="one-shelter-social-media-buttons">
      <p>Envie-nos uma mensagem</p>
      <textarea name="message" id="message" cols="30" rows="10" className="form-control-shelter" placeholder="Digite sua mensagem..."></textarea>
      <span>{shelterSocialMedia}</span>
    </div>
  );
}

export default ShelterSocialMedia;
