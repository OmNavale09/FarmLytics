import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Cookies from "js-cookie";
import "./index.css";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsAnalyzing(false); // Reset if a new image is picked
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    // Simulate API call
    const result = await analyzePlantDisease(selectedFile);
    console.log("Final Result:", result);
    setAnalysisResult(result);
    save(result);
    setIsAnalyzing(false);
  };

const save = async (analysisData) => {
  const token = Cookies.get("token");

  try {
    const response = await fetch("http://localhost:5000/api/analysis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(analysisData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error:", data);
      throw new Error(data.message || "Failed to save analysis");
    }

    console.log("Analysis saved:", data);
  } catch (error) {
    console.error("Error saving analysis:", error);
  }
};

const analyzePlantDisease = async (imageFile) => {
  try {
    if (!imageFile) {
      throw new Error("No image selected");
    }

    /* ----------------------------
       1️⃣ Upload Image to Cloudinary
    ----------------------------- */

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "");
    formData.append("cloud_name", "");

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${fromData.cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(uploadData.error.message);
    }

    const imageUrl = uploadData.secure_url;
    setImageUrl(imageUrl);
    console.log("Image uploaded to Cloudinary:", imageUrl);

    /* ----------------------------
       2️⃣ Send Image URL to puter.ai
    ----------------------------- */

    const prompt = `
You are an agricultural plant disease expert.

Analyze the plant image and respond ONLY in valid JSON format.

Return strictly this structure:

{
  "cropName": "string",
  "diseaseName": "string",
  "diseaseConfidence": number (0-100),
  "severityLevel": "low | medium | high",
  "symptoms": "string",
  "treatment": "string",
  "preventionTips": "string"
}

Do not include explanations.
Only return pure JSON.
`;

const response = await puter.ai.chat(prompt, imageUrl,{
  model: "gpt-5-nano",
});

console.log("PUTER RAW RESPONSE:", response);

const aiText = response?.message?.content;

if (!aiText) {
  throw new Error("Empty AI response");
}

    // Extract JSON safely
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch[0]);

    /* ----------------------------
       3️⃣ Return Combined Result
    ----------------------------- */
    console.log("Analysis Result:", { imageUrl, ...parsed })
    return {
      imageUrl,
      ...parsed,
    };
  } catch (error) {
    console.error("Analysis Error:", error);

    return {
      imageUrl: null,
      diseaseName: "Unknown",
      diseaseConfidence: 0,
      severityLevel: "low",
      symptoms: "Unable to analyze image.",
      treatment: "Please try again.",
      preventionTips: "Ensure clear plant image.",
    };
  }
};

const result = () => (
  <div className="result-card">
  <h3>Diagnosis Result</h3>
  {!analysisResult.diseaseName ? (
    <p className="placeholder-text">
      {isAnalyzing ? "Our AI is examining the leaf patterns..." : "Your results will appear here after analysis."}
    </p>
  ) : (
    <div className="analysis-container">
      {/* Header Info */}
      <div className="result-main-info">
        <div>
          <span className={`severity-badge ${analysisResult.severityLevel}`}>
            {analysisResult.severityLevel} severity
          </span>
          <h2 className="disease-name">{analysisResult.diseaseName}</h2>
        </div>
        <div className="confidence-score">
          <span className="score-num">{analysisResult.diseaseConfidence}%</span>
          <span className="score-label">Confidence</span>
        </div>
      </div>

      <div className="result-divider"></div>

      {/* Grid for Symptoms and Treatment */}
      <div className="result-grid">
        <div className="result-section">
          <h4>🔍 Observed Symptoms</h4>
          <p>{analysisResult.symptoms}</p>
        </div>

        <div className="result-section">
          <h4>💊 Recommended Treatment</h4>
          <ul className="action-list">
            {analysisResult.treatment.split(';').map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full width Prevention section */}
      <div className="prevention-banner">
        <h4>🛡️ Prevention Strategy</h4>
        <p>{analysisResult.preventionTips}</p>
      </div>
    </div>
  )}
</div>
)

const info = () => (
  <div className="right-column">
            <div className="info-box">
              <h4>📸 Tips for Best Results</h4>
              <ul>
                <li><strong>Natural Light:</strong> Avoid harsh shadows or dark rooms.</li>
                <li><strong>Focus:</strong> Ensure the leaf spots are sharp and clear.</li>
                <li><strong>Distance:</strong> Hold the camera about 6-10 inches away.</li>
              </ul>
            </div>

            <div className="supported-plants">
              <h4>Supported Plants</h4>
              <div className="tag-container">
                <span className="plant-tag">Tomato</span>
                <span className="plant-tag">Potato</span>
                <span className="plant-tag">Apple</span>
                <span className="plant-tag">Grape</span>
                <span className="plant-tag">Corn</span>
              </div>
            </div>
          </div>
)

  return (
    <div className="home-container">
      <Sidebar />

      <div className="home-content">
        <header className="hero-section">
          <h1 className="main-heading">🌱 AI Plant Disease Analyzer</h1>
          <p className="sub-text">
            Upload a photo of your plant's leaves to detect diseases and get treatment advice.
          </p>
        </header>

        <div className="main-grid">
          {/* Left Column: Upload & Preview */}
          <div className="left-column">
            <div className="upload-card">
              <label className={`dropzone ${previewUrl ? "has-image" : ""}`}>
                <input 
                  type="file" 
                  className="hidden-input" 
                  onChange={handleImageChange} 
                  accept="image/*" 
                />
                
                {previewUrl ? (
                  <div className="preview-container">
                    <img src={previewUrl} alt="Selected Plant" className="image-preview" />
                    {isAnalyzing && <div className="scanning-line"></div>}
                    <button 
                      className="change-image-btn" 
                      onClick={(e) => {
                        e.preventDefault();
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                    >
                      Remove & Change
                    </button>
                  </div>
                ) : (
                  <div className="dropzone-placeholder">
                    <span className="upload-icon">📸</span>
                    <p><strong>Click to upload</strong> or drag and drop</p>
                    <span className="file-types">Supports JPG, PNG, WEBP</span>
                  </div>
                )}
              </label>

              <button 
                className={`analyze-btn ${!previewUrl || isAnalyzing ? 'disabled' : ''}`}
                onClick={handleAnalyze}
                disabled={!previewUrl || isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Plant"}
              </button>
            </div>

            {info()}
          </div>

          {/* Right Column: Tips & Info */}
          {result()}
        </div>
      </div>
    </div>
  );
};

export default Home;
