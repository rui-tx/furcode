import "./styles/index.css";

import React from 'react'

function OneShelterDescription({shelterHistory, shelterSocialMedia}) {
  return (
    <div className="one-shelter-container-description">
        <h2 className="one-shelter-description-title">História</h2>
        <p className="one-shelter-description-text">{shelterHistory}</p>
        <div className="one-shelter-social-media">
            
            <div className="one-shelter-social-media-buttons">
                <p>Contacte-nos</p>
                <span>{shelterSocialMedia}</span>
            </div>
            <div className="one-shelter-voluteer">
                <button className="one-shelter-voluteer-button">Voluntariar</button>
            </div>
        </div>
    </div>
  )
}

export default OneShelterDescription