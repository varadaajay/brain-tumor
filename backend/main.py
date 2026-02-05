# backend/main.py

import os
import shutil
import uuid
import random

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# =========================
# FastAPI App
# =========================
app = FastAPI(title="Brain Tumor Segmentation API")

# =========================
# CORS (React Support)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Upload Folder
# =========================
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# =========================
# Dummy Model Load
# =========================
model = "loaded"   # simulate loaded model


# =========================
# Routes
# =========================

@app.get("/")
def root():
    return {"status": "API is running"}


# =========================
# Upload MRI
# =========================
@app.post("/upload-mri")
async def upload_mri(file: UploadFile = File(...)):

    try:
        file_id = str(uuid.uuid4())
        file_path = os.path.join(
            UPLOAD_DIR,
            f"{file_id}_{file.filename}"
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "status": "success",
            "file_id": file_id,
            "filename": file.filename,
            "message": "MRI uploaded successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )


# =========================
# Segmentation
# =========================
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
        "classification":
            "Glioblastoma"
            if tumor_detected
            else "No Tumor"
    }
