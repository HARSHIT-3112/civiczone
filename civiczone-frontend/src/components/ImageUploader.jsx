import { useState } from "react";
import { analyzeIssue } from "../services/api";
import ResultCard from "./ResultCard";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null); // 🆕 new state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setEmailStatus(null);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setStatus("📍 Detecting location...");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setStatus("🔍 Analyzing issue...");

      try {
        const data = await analyzeIssue(image, latitude, longitude);
        setResult(data);
        setStatus("✅ Report generated successfully!");
        setEmailStatus(data.email_sent); // 🆕 store email status
      } catch (error) {
        console.error(error);
        setStatus("❌ Something went wrong!");
        setEmailStatus(false);
      }
    });
  };

  return (
    <div className="upload-card">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input"
      />

      {preview && <img src={preview} alt="Preview" className="preview" />}

      <button onClick={handleSubmit} className="upload-btn">
        🚀 Report Issue
      </button>

      <p className="status">{status}</p>

      {result && <ResultCard result={result} />}

      {/* 🆕 Show email status */}
      {emailStatus === true && (
        <p className="email-success">✅ Email successfully sent to the respective authority.</p>
      )}
      {emailStatus === false && (
        <p className="email-failure">❌ Failed to send email. Please try again.</p>
      )}
    </div>
  );
}

export default ImageUploader;
