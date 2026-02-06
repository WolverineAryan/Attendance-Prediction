import React, { useContext, useState } from "react";
import Layout from "../components/Layout.jsx";
import { DataContext } from "../context/DataContext.jsx";
import Papa from "papaparse";
import api from "../utils/axiosConfig";

export default function UploadCSV() {
  const { setCsvData } = useContext(DataContext);

  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // =======================
  // HANDLE FILE SELECTION
  // =======================
  const processFile = (selectedFile) => {
    setFile(selectedFile);

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setPreviewData(result.data.slice(0, 5));
      },
    });
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) processFile(selectedFile);
  };

  // =======================
  // DRAG AND DROP
  // =======================
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // =======================
  // UPLOAD TO BACKEND
  // =======================
  const uploadCSV = async () => {
    if (!file) {
      alert("Please select a CSV file first!");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/predict-csv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "text",
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      const csvText = res.data;

      // Store processed CSV for chatbot
      await api.post("/upload-data", {
        text: csvText,
      });

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
        },
      });

      alert("CSV Uploaded and Processed Successfully!");

    } catch (err) {
      console.error("UPLOAD ERROR:", err);

      // BETTER ERROR HANDLING
      if (err.response) {
        const status = err.response.status;
        const serverMsg = err.response.data?.error || err.response.data?.message;

        if (status === 401) {
          alert("Session expired. Please login again.");
        } else if (status === 422) {
          alert(`Invalid request: ${serverMsg || "Authentication issue (JWT token missing)"}`);
        } else if (status === 400) {
          alert(`CSV Error: ${serverMsg}`);
        } else {
          alert(`Upload failed: ${serverMsg || "Unknown server error"}`);
        }
      } else {
        alert("Network error: Could not reach backend.");
      }

    } finally {
      setLoading(false);
    }
  };

  // =======================
  // UI
  // =======================
  return (
    <Layout>
      <div className="page-center">
        <h1 className="page-title">CSV Attendance Prediction</h1>

        <div
          className={`upload-area ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p>Drag & Drop CSV here</p>
          <p>OR</p>

          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            hidden
            id="fileInput"
          />

          <label htmlFor="fileInput" className="upload-btn">
            Choose File
          </label>

          {file && (
            <p className="file-name">
              Selected: <b>{file.name}</b>
            </p>
          )}
        </div>

        {previewData.length > 0 && (
          <div className="preview-card fade-in">
            <h3>CSV Preview (First 5 Rows)</h3>

            <table className="preview-table">
              <thead>
                <tr>
                  {Object.keys(previewData[0]).map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="primary-btn"
              onClick={uploadCSV}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload & Predict"}
            </button>
          </div>
        )}

        {loading && (
          <div className="progress-box">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{progress}% completed</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
