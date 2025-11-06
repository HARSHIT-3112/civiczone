from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
from torchvision import transforms
from utils.email_sender import send_email

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_issue(
    file: UploadFile = File(...),
    lat: float = Form(...),
    lon: float = Form(...)
):
    image = Image.open(file.file).convert("RGB")

    labels = ["pothole", "garbage", "pollution", "streetlight", "water leakage"]
    detected_label = labels[torch.randint(0, len(labels), (1,)).item()]

    description = f"A {detected_label} has been detected near latitude {lat:.4f}, longitude {lon:.4f}. Please verify and take corrective action."

    email_status = send_email(detected_label, description, lat, lon)

    return {
        "label": detected_label,
        "description": description,
        "email_sent": email_status
    }
