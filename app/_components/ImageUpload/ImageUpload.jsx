import { useState } from "react";
import "./styles/index.css";

const ImageUpload = ({ to, id }) => {
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
      };
      reader.readAsDataURL(file);
      setError("");
      setSuccess("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

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
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {preview && (
        <img className="preview-image" src={preview} alt="Image preview" />
      )}
    </div>
  );
};

export default ImageUpload;
