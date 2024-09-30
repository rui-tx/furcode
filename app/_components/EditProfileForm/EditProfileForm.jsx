"use client";
import React, { useState } from "react";
import "./styles/index.css";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Teste",
    lastName: "teste",
    email: "teste@example.com",
    address1: "rua da mindera",
    address2: "",
    postalCode: "4435",
    cellPhone: "9122345235",
  });
  const [profilePicture, setProfilePicture] = useState(
    "https://preview.redd.it/mfyjb5he21761.jpg?width=1080&crop=smart&auto=webp&s=ee9f946f20d0ad96ac134393f0e65265ded42174"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-picture">
          <img src={profilePicture} alt="Profile" />
          <label htmlFor="profile-pic-upload" className="file-label">
            Change Picture
          </label>
          <input
            type="file"
            id="profile-pic-upload"
            className="file-input"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="form-content">
          <h1>Edit Your Profile</h1>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="form-group">
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={
                  key === "email"
                    ? "email"
                    : key === "cellPhone"
                    ? "tel"
                    : "text"
                }
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                required={key !== "address2"}
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
