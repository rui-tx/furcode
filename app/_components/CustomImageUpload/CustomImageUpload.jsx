import React, { useState } from "react";
import { Camera } from "lucide-react";
import "./styles/index.css";

const CustomImageUpload = ({ setShelterImage, setShelterImageExtension }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setShelterImage(file);
      setShelterImageExtension(file.name.split(".").pop());
    }
  };

  return (
    <div className="shelter-image-upload-container">
      <label
        htmlFor="shelter-image-upload"
        className="shelter-image-upload-label"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="shelter-image-preview"
          />
        ) : (
          <div className="shelter-image-upload-placeholder">
            <Camera className="shelter-image-upload-icon" />
            <p className="shelter-image-upload-text">
              Clique para fazer upload da imagem do abrigo
            </p>
          </div>
        )}
      </label>
      <input
        id="shelter-image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="shelter-image-upload-input"
      />
    </div>
  );
};

export default CustomImageUpload;
