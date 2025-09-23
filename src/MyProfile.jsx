import React from "react";
import "./MyProfile.css";

const MyProfile = () => {
  const fullname = sessionStorage.getItem("fullname") || "Guest User";
  const email = sessionStorage.getItem("email") || "guest@example.com";
  const role = sessionStorage.getItem("role") || "Adopter"; // fallback role
  const contact = "9876543210"; // static number

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile picture in public/profile.jpg */}
        <img src="/profile.jpg" alt="Profile" className="profile-image" />

        <h2>{fullname}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
    </div>
  );
};

export default MyProfile;
