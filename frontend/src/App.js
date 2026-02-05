import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://brain-tumor-8wlk.onrender.com";

  const uploadMRI = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/upload-mri`,
        formData
      );

      setFileId(res.data.file_id);
      alert("Uploaded");
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const segmentMRI = async () => {
    if (!fileId) return alert("Upload first");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/segment/${fileId}`
      );

      setResult(res.data);
    } catch {
      alert("Segmentation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🧠 Brain Tumor Segmentation</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br /><br />

      <button onClick={uploadMRI}>
        Upload MRI
      </button>

      <button onClick={segmentMRI}>
        Segment MRI
      </button>

      {loading && <p>Processing…</p>}

      {result && (
        <div>
          <h3>Result</h3>
          <p>Status: {result.status}</p>
          <p>
            Tumor:
            {result.tumor_detected
              ? " Yes"
              : " No"}
          </p>
          <p>
            Class:
            {result.classification}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
