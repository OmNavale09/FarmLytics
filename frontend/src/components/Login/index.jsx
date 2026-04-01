import Cookies from "js-cookie";
import {useState} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaLeaf, FaArrowRight } from "react-icons/fa";
import "./index.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isCheck = (event) => {
    if(event.target.checked){
        setShowPassword(true);
    } else {
        setShowPassword(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resonse = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await resonse.json();
    if(resonse.ok){
      Cookies.set("token", data.token, { expires: 7 });
      window.location.href = "/";
    }
  };


  return (
    <div className="split-auth-container">
      {/* LEFT SIDE: Form */}
      <motion.div 
        className="auth-form-side"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="form-wrapper">
          <div className="brand-header">
            <FaLeaf /> <span>FarmLytics</span>
          </div>
          
          <div className="text-header">
            <h2>Welcome Back!</h2>
            <p>Please enter your details to access your farm data.</p>
          </div>

          <form className="main-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="field-icon" />
                <input type="email" placeholder="hello@farm.com" required onChange={handleEmailChange}/>
              </div>
            </div>

            <div className="input-field">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="field-icon" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" required onChange={handlePasswordChange}/>
              </div>
            </div>

            <div className="form-meta">
              <label style={{color: '#2E7D32'}}><input type="checkbox" onChange={isCheck}/> Show Password</label>
              <Link to="/forgot" className="accent-link">Forgot password?</Link>
            </div>

            <button type="submit" className="submit-btn">
              Sign In <FaArrowRight />
            </button>
          </form>

          <p className="switch-auth">
            Don't have an account? <Link to="/register">Create one for free</Link>
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Immersive Image */}
      <div className="auth-image-side">
        <div className="image-overlay">
          <motion.div 
            className="quote-box"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>"The future of farming is data-driven."</h3>
            <p>Join over 5,000 farmers using FarmLytics AI to protect their crops.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;