import { useState } from "react";
import "./styles/index.css";

const ImageUpload = ({
  to,
  id,
  noUpload,
  setPetImage,
  setPetImageExtension,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (setPetImage) {
          setPetImage(file);
          setPetImageExtension(file.name.split(".").pop());
        }
      };
      reader.readAsDataURL(file);
      setError("");
      setSuccess("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (noUpload) return;
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", formData);

    const response = await fetch(`/api/uploadImage?to=${to}&id=${id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setError(errorMessage);
    } else {
      setSuccess("Image uploaded successfully!");
      setSelectedFile(null);
      setPreview("");
    }
  };

  return (
    <div className="upload-image-container">
      <input
        className="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={handleUpload}>
        Carregar Imagem
      </button>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {preview && (
        <img className="preview-image" src={preview} alt="Image preview" />
      )}
    </div>
  );
};

export default ImageUpload;
