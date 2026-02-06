// // import { useState } from "react";
// // import axios from "axios";
// // import "./App.css";

// // function App() {
// //   const [file, setFile] = useState(null);
// //   const [fileId, setFileId] = useState("");
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const API_URL = "http://127.0.0.1:8000";

// //   // Upload MRI
// //   const uploadMRI = async () => {
// //     if (!file) {
// //       alert("Please select MRI file");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", file);

// //     try {
// //       setLoading(true);

// //       const res = await axios.post(
// //         `${API_URL}/upload-mri`,
// //         formData
// //       );

// //       setFileId(res.data.file_id);
// //       alert("MRI Uploaded Successfully ✅");

// //     } catch (err) {
// //       alert("Upload Failed ❌");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Segmentation
// //   const segmentMRI = async () => {
// //     if (!fileId) {
// //       alert("Upload MRI First");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const res = await axios.post(
// //         `${API_URL}/segment/${fileId}`
// //       );

// //       setResult(res.data);

// //     } catch {
// //       alert("Segmentation Failed ❌");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="dashboard">

// //       {/* Header */}
// //       <div className="header">
// //         <h2>NeuroScan <span>AI</span></h2>
// //         <p>Advanced Brain Tumor Segmentation Portal</p>
// //       </div>

// //       <div className="main-grid">

// //         {/* Upload Panel */}
// //         <div className="upload-card">

// //           <h3>Select MRI Scan</h3>

// //           {/* File Picker */}
// //           <input
// //             type="file"
// //             className="file-input"
// //             onChange={(e) =>
// //               setFile(e.target.files[0])
// //             }
// //           />

// //           {file && (
// //             <p className="filename">
// //               Selected: {file.name}
// //             </p>
// //           )}

// //           <div className="btn-group">
// //             <button onClick={uploadMRI}>
// //               Upload MRI
// //             </button>

// //             <button onClick={segmentMRI}>
// //               Run Segmentation
// //             </button>
// //           </div>

// //           {loading && (
// //             <p className="loading">
// //               Processing...
// //             </p>
// //           )}
// //         </div>

// //         {/* Preview Panel */}
// //         <div className="preview-card">

// //           <div className="image-grid">

// //             <div>
// //               <h4>MRI Scan Preview</h4>
// //               <img
// //                 src="https://upload.wikimedia.org/wikipedia/commons/6/6e/MRI_head_side.jpg"
// //                 alt="MRI"
// //               />
// //             </div>

// //             <div>
// //               <h4>Segmented Mask</h4>
// //               <img
// //                 src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Brain_MRI_segmentation.png"
// //                 alt="Segmentation"
// //               />
// //             </div>

// //           </div>

// //           {result && (
// //             <div className="result-box">
// //               <h4>Results Summary</h4>

// //               <p>
// //                 <b>Status:</b> {result.status}
// //               </p>

// //               <p>
// //                 <b>Tumor Detected:</b>{" "}
// //                 {result.tumor_detected
// //                   ? "Yes"
// //                   : "No"}
// //               </p>

// //               <p>
// //                 <b>Classification:</b>{" "}
// //                 {result.classification}
// //               </p>
// //             </div>
// //           )}

// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [file, setFile] = useState(null);
//   const [fileId, setFileId] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const API_URL = "http://127.0.0.1:8000";

//   // Handle file selection with preview
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
    
//     // Create preview URL for image files
//     if (selectedFile) {
//       const url = URL.createObjectURL(selectedFile);
//       setPreviewUrl(url);
//     }
//   };

//   // Upload MRI
//   const uploadMRI = async () => {
//     if (!file) {
//       alert("Please select MRI file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       setUploadProgress(0);

//       const res = await axios.post(
//         `${API_URL}/upload-mri`,
//         formData,
//         {
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(progress);
//           }
//         }
//       );

//       setFileId(res.data.file_id);
//       setUploadProgress(100);
      
//       // Success animation delay
//       setTimeout(() => {
//         alert("MRI Uploaded Successfully ✅");
//       }, 300);

//     } catch (err) {
//       alert("Upload Failed ❌");
//       setUploadProgress(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Segmentation
//   const segmentMRI = async () => {
//     if (!fileId) {
//       alert("Upload MRI First");
//       return;
//     }

//     try {
//       setLoading(true);
//       setResult(null);

//       const res = await axios.post(
//         `${API_URL}/segment/${fileId}`
//       );

//       // Simulate processing delay for better UX
//       setTimeout(() => {
//         setResult(res.data);
//         setLoading(false);
//       }, 1500);

//     } catch {
//       alert("Segmentation Failed ❌");
//       setLoading(false);
//     }
//   };

//   // Clear all data
//   const resetApp = () => {
//     setFile(null);
//     setFileId("");
//     setResult(null);
//     setPreviewUrl(null);
//     setUploadProgress(0);
//   };

//   return (
//     <div className="dashboard">
      
//       {/* Animated Background */}
//       <div className="bg-pattern"></div>
//       <div className="gradient-overlay"></div>

//       {/* Header */}
//       <header className="header">
//         <div className="header-content">
//           <div className="logo-section">
//             <div className="logo-icon">
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
//                 <circle cx="12" cy="12" r="3"/>
//               </svg>
//             </div>
//             <div>
//               <h1 className="title">
//                 NeuroScan <span className="highlight">AI</span>
//               </h1>
//               <p className="subtitle">Advanced Brain Tumor Segmentation Portal</p>
//             </div>
//           </div>
          
//           <div className="status-badge">
//             <span className="status-dot"></span>
//             <span>System Active</span>
//           </div>
//         </div>
//       </header>

//       <div className="main-container">

//         {/* Left Panel - Upload Controls */}
//         <aside className="control-panel">
          
//           <div className="panel-card">
//             <h3 className="panel-title">Upload MRI Scan</h3>
            
//             {/* Custom File Input */}
//             <label className="file-upload-area">
//               <input
//                 type="file"
//                 accept=".nii,.nii.gz,.dcm,image/*"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
              
//               <div className="upload-icon">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                   <polyline points="17 8 12 3 7 8" />
//                   <line x1="12" y1="3" x2="12" y2="15" />
//                 </svg>
//               </div>
              
//               <div className="upload-text">
//                 <p className="upload-label">Click to browse</p>
//                 <p className="upload-hint">or drag and drop</p>
//                 <p className="upload-formats">NIfTI, DICOM, or Image files</p>
//               </div>
//             </label>

//             {file && (
//               <div className="file-info">
//                 <div className="file-icon">📄</div>
//                 <div className="file-details">
//                   <p className="file-name">{file.name}</p>
//                   <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
//                 </div>
//                 <button className="clear-btn" onClick={resetApp}>✕</button>
//               </div>
//             )}

//             {/* Upload Progress */}
//             {loading && uploadProgress > 0 && uploadProgress < 100 && (
//               <div className="progress-container">
//                 <div className="progress-bar">
//                   <div 
//                     className="progress-fill" 
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//                 <p className="progress-text">{uploadProgress}% uploaded</p>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="action-buttons">
//               <button 
//                 className="btn btn-primary" 
//                 onClick={uploadMRI}
//                 disabled={!file || loading}
//               >
//                 {loading && !fileId ? (
//                   <>
//                     <span className="spinner"></span>
//                     Uploading...
//                   </>
//                 ) : (
//                   <>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                       <polyline points="7 10 12 15 17 10" />
//                       <line x1="12" y1="15" x2="12" y2="3" />
//                     </svg>
//                     Upload MRI
//                   </>
//                 )}
//               </button>

//               <button 
//                 className="btn btn-secondary" 
//                 onClick={segmentMRI}
//                 disabled={!fileId || loading}
//               >
//                 {loading && fileId ? (
//                   <>
//                     <span className="spinner"></span>
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polygon points="5 3 19 12 5 21 5 3" />
//                     </svg>
//                     Run Segmentation
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Status Messages */}
//             {fileId && !result && (
//               <div className="status-message success">
//                 <span>✓</span> MRI uploaded successfully. Ready for analysis.
//               </div>
//             )}
//           </div>

//           {/* Info Card */}
//           <div className="info-card">
//             <h4>Processing Pipeline</h4>
//             <div className="pipeline-steps">
//               <div className={`pipeline-step ${file ? 'active' : ''}`}>
//                 <div className="step-number">1</div>
//                 <div className="step-label">File Upload</div>
//               </div>
//               <div className={`pipeline-step ${fileId ? 'active' : ''}`}>
//                 <div className="step-number">2</div>
//                 <div className="step-label">Preprocessing</div>
//               </div>
//               <div className={`pipeline-step ${result ? 'active' : ''}`}>
//                 <div className="step-number">3</div>
//                 <div className="step-label">Segmentation</div>
//               </div>
//             </div>
//           </div>

//         </aside>

//         {/* Right Panel - Preview & Results */}
//         <main className="preview-section">
          
//           <div className="preview-grid">
            
//             {/* MRI Preview */}
//             <div className="preview-card">
//               <div className="card-header">
//                 <h4>MRI Scan Preview</h4>
//                 <span className="badge">Input</span>
//               </div>
//               <div className="image-container">
//                 {previewUrl ? (
//                   <img src={previewUrl} alt="MRI Preview" className="preview-image" />
//                 ) : (
//                   <div className="placeholder">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                       <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                       <circle cx="8.5" cy="8.5" r="1.5" />
//                       <polyline points="21 15 16 10 5 21" />
//                     </svg>
//                     <p>No scan uploaded</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Segmentation Result */}
//             <div className="preview-card">
//               <div className="card-header">
//                 <h4>Segmented Mask</h4>
//                 <span className="badge">Output</span>
//               </div>
//               <div className="image-container">
//                 {result ? (
//                   <img 
//                     src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Brain_MRI_segmentation.png" 
//                     alt="Segmentation" 
//                     className="preview-image"
//                   />
//                 ) : (
//                   <div className="placeholder">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                       <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
//                       <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
//                       <polyline points="7.5 19.79 7.5 14.6 3 12" />
//                       <polyline points="21 12 16.5 14.6 16.5 19.79" />
//                       <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
//                       <line x1="12" y1="22.08" x2="12" y2="12" />
//                     </svg>
//                     <p>Awaiting segmentation</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//           </div>

//           {/* Results Panel */}
//           {result && (
//             <div className="results-panel">
//               <div className="results-header">
//                 <h3>Analysis Results</h3>
//                 <span className="timestamp">
//                   {new Date().toLocaleTimeString()}
//                 </span>
//               </div>

//               <div className="results-grid">
                
//                 <div className="result-card">
//                   <div className="result-icon status">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <polyline points="20 6 9 17 4 12" />
//                     </svg>
//                   </div>
//                   <div className="result-content">
//                     <p className="result-label">Status</p>
//                     <p className="result-value">{result.status}</p>
//                   </div>
//                 </div>

//                 <div className="result-card">
//                   <div className={`result-icon ${result.tumor_detected ? 'warning' : 'success'}`}>
//                     {result.tumor_detected ? (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <circle cx="12" cy="12" r="10" />
//                         <line x1="12" y1="8" x2="12" y2="12" />
//                         <line x1="12" y1="16" x2="12.01" y2="16" />
//                       </svg>
//                     ) : (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//                         <polyline points="22 4 12 14.01 9 11.01" />
//                       </svg>
//                     )}
//                   </div>
//                   <div className="result-content">
//                     <p className="result-label">Tumor Detection</p>
//                     <p className="result-value">
//                       {result.tumor_detected ? "Detected" : "Not Detected"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="result-card">
//                   <div className="result-icon classification">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                       <polyline points="14 2 14 8 20 8" />
//                       <line x1="16" y1="13" x2="8" y2="13" />
//                       <line x1="16" y1="17" x2="8" y2="17" />
//                       <polyline points="10 9 9 9 8 9" />
//                     </svg>
//                   </div>
//                   <div className="result-content">
//                     <p className="result-label">Classification</p>
//                     <p className="result-value">{result.classification}</p>
//                   </div>
//                 </div>

//               </div>

//               {result.tumor_detected && (
//                 <div className="warning-banner">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
//                     <line x1="12" y1="9" x2="12" y2="13" />
//                     <line x1="12" y1="17" x2="12.01" y2="17" />
//                   </svg>
//                   <div>
//                     <p className="warning-title">Medical Review Required</p>
//                     <p className="warning-text">
//                       These results require validation by a qualified healthcare professional. 
//                       Do not use for self-diagnosis.
//                     </p>
//                   </div>
//                 </div>
//               )}

//             </div>
//           )}

//         </main>

//       </div>

//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const API_URL = "http://127.0.0.1:8000";

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Upload MRI
  const uploadMRI = async () => {
    if (!file) {
      alert("Please select MRI file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setUploadProgress(0);

      const res = await axios.post(
        `${API_URL}/upload-mri`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        }
      );

      setFileId(res.data.file_id);
      setUploadProgress(100);
      
      setTimeout(() => {
        alert("MRI Uploaded Successfully ✅");
      }, 300);

    } catch (err) {
      alert("Upload Failed ❌");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // Segmentation
  const segmentMRI = async () => {
    if (!fileId) {
      alert("Upload MRI First");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post(
        `${API_URL}/segment/${fileId}`
      );

      setTimeout(() => {
        setResult(res.data);
        setLoading(false);
      }, 1500);

    } catch {
      alert("Segmentation Failed ❌");
      setLoading(false);
    }
  };

  // Clear all data
  const resetApp = () => {
    setFile(null);
    setFileId("");
    setResult(null);
    setUploadProgress(0);
  };

  return (
    <div className="dashboard">
      
      {/* Animated Background */}
      <div className="bg-pattern"></div>
      <div className="gradient-overlay"></div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div>
              <h1 className="title">
                NeuroScan <span className="highlight">AI</span>
              </h1>
              <p className="subtitle">Advanced Brain Tumor Segmentation Portal</p>
            </div>
          </div>
          
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>System Active</span>
          </div>
        </div>
      </header>

      <div className="main-container">

        {/* Control Panel */}
        <aside className="control-panel">
          
          <div className="panel-card">
            <h3 className="panel-title">Upload MRI Scan</h3>
            
            {/* Custom File Input */}
            <label className="file-upload-area">
              <input
                type="file"
                accept=".nii,.nii.gz,.dcm,image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              
              <div className="upload-text">
                <p className="upload-label">Click to browse</p>
                <p className="upload-hint">or drag and drop</p>
                <p className="upload-formats">NIfTI, DICOM, or Image files</p>
              </div>
            </label>

            {file && (
              <div className="file-info">
                <div className="file-icon">📄</div>
                <div className="file-details">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button className="clear-btn" onClick={resetApp}>✕</button>
              </div>
            )}

            {/* Upload Progress */}
            {loading && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="progress-text">{uploadProgress}% uploaded</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="btn btn-primary" 
                onClick={uploadMRI}
                disabled={!file || loading}
              >
                {loading && !fileId ? (
                  <>
                    <span className="spinner"></span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Upload MRI
                  </>
                )}
              </button>

              <button 
                className="btn btn-secondary" 
                onClick={segmentMRI}
                disabled={!fileId || loading}
              >
                {loading && fileId ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Run Segmentation
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {fileId && !result && (
              <div className="status-message success">
                <span>✓</span> MRI uploaded successfully. Ready for analysis.
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="info-card">
            <h4>Processing Pipeline</h4>
            <div className="pipeline-steps">
              <div className={`pipeline-step ${file ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">File Upload</div>
              </div>
              <div className={`pipeline-step ${fileId ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Preprocessing</div>
              </div>
              <div className={`pipeline-step ${result ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Segmentation</div>
              </div>
            </div>
          </div>

        </aside>

        {/* Results Section */}
        <main className="results-section">
          
          {/* Results Panel */}
          {result ? (
            <div className="results-panel">
              <div className="results-header">
                <h3>Analysis Results</h3>
                <span className="timestamp">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              <div className="results-grid">
                
                <div className="result-card">
                  <div className="result-icon status">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="result-content">
                    <p className="result-label">Status</p>
                    <p className="result-value">{result.status}</p>
                  </div>
                </div>

                <div className="result-card">
                  <div className={`result-icon ${result.tumor_detected ? 'warning' : 'success'}`}>
                    {result.tumor_detected ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                  </div>
                  <div className="result-content">
                    <p className="result-label">Tumor Detection</p>
                    <p className="result-value">
                      {result.tumor_detected ? "Detected" : "Not Detected"}
                    </p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon classification">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div className="result-content">
                    <p className="result-label">Classification</p>
                    <p className="result-value">{result.classification}</p>
                  </div>
                </div>

              </div>

              {result.tumor_detected && (
                <div className="warning-banner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <div>
                    <p className="warning-title">Medical Review Required</p>
                    <p className="warning-text">
                      These results require validation by a qualified healthcare professional. 
                      Do not use for self-diagnosis.
                    </p>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h3>No Analysis Results Yet</h3>
              <p>Upload an MRI scan and run segmentation to view results</p>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default App;