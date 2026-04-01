import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaLeaf } from "react-icons/fa";
import Sidebar from "../sidebar";
import "./index.css";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [historyData, setHistoryData] = useState([]);

  // Mock data for history
  const mockHistoryData = [
    { id: 1, plant: "Tomato", disease: "Late Blight", date: "Feb 24, 2026", confidence: 98, status: "Critical", img: "https://via.placeholder.com/150" },
    { id: 2, plant: "Apple", disease: "Healthy", date: "Feb 20, 2026", confidence: 99, status: "Healthy", img: "https://via.placeholder.com/150" },
    { id: 3, plant: "Potato", disease: "Early Blight", date: "Feb 18, 2026", confidence: 85, status: "Warning", img: "https://via.placeholder.com/150" },
    { id: 4, plant: "Corn", disease: "Common Rust", date: "Feb 15, 2026", confidence: 92, status: "Warning", img: "https://via.placeholder.com/150" },
  ];

  useEffect(() => {
    getHistoryData();
  }, []);

  const getHistoryData = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch("http://localhost:5000/api/analysis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item._id,
        plant: item.cropName,
        disease: item.diseaseName,
        date: new Date(item.createdAt).toLocaleDateString(),
        confidence: item.diseaseConfidence,
        status: item.severityLevel,
        img: item.imageUrl,
      }));
      setHistoryData(formattedData);
      console.log("Fetched history data:", formattedData)
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <header className="history-header">
          <div>
            <h1 className="main-heading">Scan History</h1>
            <p className="sub-text">Review your past plant diagnoses and progress.</p>
          </div>
          
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search plants or diseases..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <motion.div 
          className="history-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {historyData.map((item) => (
            <motion.div 
              key={item.id} 
              className="history-card"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <div className="card-image">
                <img src={item.img} alt={item.plant} />
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="card-info">
                <div className="card-top">
                  <h4>{item.plant}</h4>
                  <span className="conf-score">{item.confidence}% Match</span>
                </div>
                <p className="disease-name">{item.disease}</p>
                <div className="card-footer">
                  <span><FaCalendarAlt /> {item.date}</span>
                  <button className="view-btn">Details</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default History;