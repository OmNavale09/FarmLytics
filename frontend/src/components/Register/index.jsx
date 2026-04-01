import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaLeaf, FaChevronLeft } from "react-icons/fa";
import "./index.css";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
      })
    });

    if (response.ok) {
      // Handle successful registration
    } else {
      // Handle registration error
    }
  }

  return (
    <div className="split-auth-container registration-theme">
      {/* LEFT SIDE: Intro & Brand */}
      <div className="auth-intro-side">
        <div className="intro-content">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-header-light">
              <FaLeaf /> <span>FarmLytics</span>
            </div>
            <h1 className="intro-heading">Join the Green Revolution</h1>
            <p className="intro-para">
              Create your account to start monitoring crop health with our 
              state-of-the-art AI. Get instant diagnosis, track history, 
              and receive localized weather alerts tailored for your farm.
            </p>
            <div className="feature-list">
              <div className="feature-item">✓ Unlimited Plant Scans</div>
              <div className="feature-item">✓ Real-time Disease Tracking</div>
              <div className="feature-item">✓ Professional Treatment Guides</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Register Form */}
      <motion.div 
        className="auth-form-side"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="form-wrapper">
          <div className="mobile-brand-logo">
             <FaLeaf /> <span>FarmLytics</span>
          </div>
          
          <div className="text-header">
            <h2>Create Account</h2>
            <p>Enter your details to get started.</p>
          </div>

          <form className="main-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FaUser className="field-icon" />
                <input type="text" placeholder="John Doe" required />
              </div>
            </div>

            <div className="input-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="field-icon" />
                <input type="email" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="field-icon" />
                <input type="password" placeholder="Min. 8 characters" required />
              </div>
            </div>

            <button type="submit" className="submit-btn register-btn">
              Create Account
            </button>
          </form>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;