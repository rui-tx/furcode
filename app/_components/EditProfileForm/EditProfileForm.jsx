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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Profile updated successfully:", result);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address1">Address 1</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cellPhone">Cell Phone</label>
            <input
              type="tel"
              id="cellPhone"
              name="cellPhone"
              value={formData.cellPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
