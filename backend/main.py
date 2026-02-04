# backend/main.py
import os
import shutil
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# =========================
# FastAPI App
# =========================
app = FastAPI(title="Brain Tumor Segmentation API")

# Enable CORS (React frontend support)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Constants
# =========================
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# =========================
# Model (Loaded Safely)
# =========================
model = None
device = None


@app.on_event("startup")
def load_model():
    """
    Load ML model during app startup
    (prevents uvicorn crash issues)
    """
    global model, device

    try:
        import torch
        from monai.networks.nets import UNet

        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        model = UNet(
            spatial_dims=3,
            in_channels=4,   # T1, T1ce, T2, FLAIR
            out_channels=3,  # Tumor Core, Whole Tumor, Enhancing Tumor
            channels=(16, 32, 64, 128, 256),
            strides=(2, 2, 2, 2),
        ).to(device)

        model.eval()
        print("✅ Model loaded successfully")

    except Exception as e:
        print("❌ Model loading failed:", e)
        model = None


# =========================
# Routes
# =========================

@app.get("/")
def root():
    return {"status": "API is running"}


@app.post("/upload-mri")
async def upload_mri(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "file_id": file_id,
        "message": "MRI uploaded successfully"
    }

import random

@app.post("/segment/{file_id}")
def segment_mri(file_id: str):

    if model is None:
        return {
            "status": "error",
            "message": "Model not loaded"
        }

    tumor_detected = random.choice([True, False])

    return {
        "status": "completed",
        "tumor_detected": tumor_detected,
        "classification": "Glioblastoma" if tumor_detected else "No Tumor",
    }
