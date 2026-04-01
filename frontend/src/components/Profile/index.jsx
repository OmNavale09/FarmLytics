import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar"; // Using your sidebar component
import { 
  FaUserCircle, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaSave 
} from "react-icons/fa";
import "./index.css";
import { getUserProfile } from "../../../../backend/controllers/authController";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Rahul",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    location: "Maharashtra, India",
    farmType: "Organic Vegetable Farm"
  });

  useEffect(() => {
  }, [])

  const getUser = async () => {
    const token = Cookies.get("token")
    const response = await fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if(response.ok){
      const data = await response.json()
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        location: data.location || "",
        farmType: "" 
      })
    }
  }

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="home-container">
      <Sidebar />

      <div className="home-content">
        <header className="hero-section">
          <h1 className="main-heading">👤 Farmer Profile</h1>
          <p className="sub-text">
            Manage your contact information and farm details for personalized AI analysis.
          </p>
        </header>

        <motion.div 
          className="profile-grid-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column: Profile Card */}
          <div className="profile-identity-card">
            <div className="profile-avatar-wrapper">
              <div className="avatar-circle">
                {formData.name.charAt(0)}
              </div>
              <span className="status-indicator">Online</span>
            </div>
            <h2 className="profile-user-name">{formData.name}</h2>
            <p className="profile-user-role">Member since March 2026</p>
            
            <div className="profile-stats">
              <div className="stat-box">
                <span className="stat-num">42</span>
                <span className="stat-label">Scans</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">12</span>
                <span className="stat-label">Healthy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Edit Form */}
          <div className="profile-form-card">
            <h3 className="form-header">Account Details</h3>
            
            <div className="input-row">
              <div className="input-field">
                <label><FaUserCircle /> Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <label><FaEnvelope /> Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-field">
                <label><FaPhoneAlt /> Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <label><FaMapMarkerAlt /> Farm Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-field full-width">
              <label><FaLeaf /> Farm Type / Description</label>
              <textarea 
                name="farmType"
                rows="3"
                value={formData.farmType}
                onChange={handleChange}
              />
            </div>

            <button 
              className={`update-btn ${isSaving ? 'loading' : ''}`} 
              onClick={handleUpdate}
              disabled={isSaving}
            >
              <FaSave /> {isSaving ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;