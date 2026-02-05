import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileId, setFileId] = useState("");

  // =========================
  // File Select
  // =========================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // =========================
  // Upload MRI
  // =========================
  const handleUpload = async () => {
    if (!file) {
      alert("Please select MRI file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);   // IMPORTANT

    try {
      const response = await fetch(
         "https://brain-tumor-ijn1.onrender.com/upload-mri",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setMessage(data.message);
      setFileId(data.file_id);

    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  // =========================
  // Segment MRI
  // =========================
  const handleSegment = async () => {

    if (!fileId) {
      alert("Upload MRI first");
      return;
    }

    try {
      const response = await fetch(
        `https://brain-tumor-ijn1.onrender.com/segment/${fileId}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      setMessage(
        `Result: ${data.classification}`
      );

    } catch (error) {
      console.error(error);
      setMessage("Segmentation failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Brain Tumor MRI Upload</h2>

      <input
        type="file"
        onChange={handleFileChange}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload MRI
      </button>

      <br /><br />

      <button onClick={handleSegment}>
        Run Segmentation
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;
