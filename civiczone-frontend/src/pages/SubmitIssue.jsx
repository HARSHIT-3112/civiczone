import { useState, useRef } from "react";
import { createReport } from "../services/api";

export default function SubmitIssue({ token, setPage }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const videoRef = useRef(null);
  const [status, setStatus] = useState("");

  // Open camera
  const openCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  // Capture photo
  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      setFile(new File([blob], "captured.jpg", { type: "image/jpeg" }));
      setPreview(URL.createObjectURL(blob));
    });
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please capture or upload an image!");
    setStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await createReport(file, pos.coords.latitude, pos.coords.longitude, token);
        setStatus(res.email_sent ? "✅ Issue submitted successfully!" : "⚠️ Submitted but email failed.");
        setTimeout(() => setPage("dashboard"), 1500);
      } catch (e) {
        console.error(e);
        setStatus("❌ Submission failed.");
      }
    });
  };

  return (
    <div className="upload-card">
      <h2>📸 Submit an Issue</h2>

      <div className="camera-box">
        <video ref={videoRef} autoPlay playsInline width="100%" />
        <div style={{ margin: "10px 0" }}>
          <button onClick={openCamera}>🎥 Open Camera</button>
          <button onClick={capturePhoto}>📸 Capture</button>
        </div>
      </div>

      <input type="file" accept="image/*" onChange={(e) => {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
      }} />

      {preview && <img src={preview} alt="preview" className="preview" />}

      <button onClick={handleSubmit} className="upload-btn">Submit Issue</button>
      <p>{status}</p>
    </div>
  );
}
