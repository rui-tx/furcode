import "./styles/index.css";

import React from 'react'

const ShelterImgTop = ({...props}) => {
  const { imageShelter, altImageShelter } = props;
  return (
    <div className="container-img-top-shelter">
        <img src={imageShelter} alt={altImageShelter} className="img-top-shelter"/>
    </div>
  )
}

export default ShelterImgTop