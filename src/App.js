import { useState } from "react";
import API from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://brain-tumor-8wlk.onrender.com";


  const uploadMRI = async () => {
    if (!file) {
      alert("Please select an MRI file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await API.post("/upload-mri", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFileId(res.data.file_id);
      alert("MRI uploaded successfully");
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const segmentMRI = async () => {
    if (!fileId) {
      alert("Upload MRI first");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/segment/${fileId}`);
      setResult(res.data);
    } catch (err) {
      alert("Segmentation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🧠 Brain Tumor Segmentation</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />

      <button onClick={uploadMRI}>Upload MRI</button>
      <button onClick={segmentMRI} style={{ marginLeft: "10px" }}>
        Segment MRI
      </button>

      <br /><br />

      {loading && <p>Processing...</p>}

      {result && (
        <div>
          <h3>Result</h3>
          <p><b>Status:</b> {result.status}</p>
          <p><b>Tumor Detected:</b> {result.tumor_detected ? "Yes" : "No"}</p>
          <p><b>Classification:</b> {result.classification}</p>
        </div>
      )}
    </div>
  );
}

export default App;
