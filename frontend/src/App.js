import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://brain-tumor-8wlk.onrender.com";

  // ================= Upload =================
  const uploadMRI = async () => {
    if (!file) {
      alert("Please select an MRI file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("Uploading MRI...");

      const res = await axios.post(
        `${API_URL}/upload-mri`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileId(res.data.file_id);
      setMessage("MRI uploaded successfully ✅");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= Segment =================
  const segmentMRI = async () => {
    if (!fileId) {
      alert("Upload MRI first");
      return;
    }

    try {
      setLoading(true);
      setMessage("Running segmentation...");

      const res = await axios.post(
        `${API_URL}/segment/${fileId}`
      );

      setResult(res.data);
      setMessage("Segmentation completed ✅");
    } catch (error) {
      console.error(error);
      setMessage("Segmentation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🧠 Brain Tumor Segmentation</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadMRI}>
        Upload MRI
      </button>

      <button
        onClick={segmentMRI}
        style={{ marginLeft: "10px" }}
      >
        Segment MRI
      </button>

      <br /><br />

      {loading && <p>⏳ Processing...</p>}
      {message && <p>{message}</p>}

      {result && (
        <div>
          <h3>Result</h3>
          <p><b>Status:</b> {result.status}</p>
          <p>
            <b>Tumor Detected:</b>{" "}
            {result.tumor_detected ? "Yes" : "No"}
          </p>
          <p>
            <b>Classification:</b>{" "}
            {result.classification}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
