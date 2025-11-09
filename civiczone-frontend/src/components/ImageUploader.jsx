import { useState } from "react";
import { createReport } from "../services/api";
import ResultCard from "./ResultCard";

export default function ImageUploader({ token }) {
  const [file,setFile]=useState(null);
  const [preview,setPreview]=useState(null);
  const [status,setStatus]=useState("");
  const [result,setResult]=useState(null);

  const handleChange=(e)=>{ setFile(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); setResult(null); setStatus(""); }

  const handleSubmit=async()=>{
    if(!file) return alert("Upload image");
    if(!token) return alert("Login to report");
    setStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(async (pos)=>{
      setStatus("Sending report...");
      try{
        const res = await createReport(file, pos.coords.latitude, pos.coords.longitude, token);
        setResult(res.report);
        setStatus(res.email_sent ? "Email sent" : "Email failed");
      }catch(err){
        console.error(err);
        setStatus("Failed to report");
      }
    }, ()=>alert("Allow location"));
  }

  return (
    <div className="upload-card">
      <input type="file" accept="image/*" onChange={handleChange}/>
      {preview && <img src={preview} alt="preview" className="preview"/>}
      <button onClick={handleSubmit} className="upload-btn">Report Issue</button>
      <p className="status">{status}</p>
      {result && <ResultCard result={result} />}
    </div>
  );
}
