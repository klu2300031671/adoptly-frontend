import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./AdoptionForm.css";

function AdoptionForm() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    reason: "",
    agreeVisit: false,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeVisit || !formData.agreeTerms) {
      alert("Please agree to both checkboxes before submitting.");
      return;
    }
    alert("Adoption application submitted!");
    console.log("Submitted data:", formData);
    // You can send the formData to backend here
  };

  return (
    <div className="adoption-form">
      <h1>Adopt Pet ID: {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Your Complete Home Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <textarea
          name="experience"
          placeholder="Tell us about any previous experience with pets (if any)"
          value={formData.experience}
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Tell us why you'd like to adopt this pet"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              name="agreeVisit"
              checked={formData.agreeVisit}
              onChange={handleChange}
            />
            I agree to a home visit before adoption
          </label>
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            I agree to the terms and conditions of adoption
          </label>
        </div>

        <button className="btn" type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default AdoptionForm;
