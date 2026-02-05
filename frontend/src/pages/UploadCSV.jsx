import React, { useContext, useState } from "react";
import Layout from "../components/Layout.jsx";
import { DataContext } from "../context/DataContext.jsx";
import Papa from "papaparse";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
        setPreviewData(result.data.slice(0, 5)); // show only first 5 rows
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
      const res = await axios.post(`${API_URL}/predict-csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "text",
        onUploadProgress: (event) => {
          const percent = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percent);
        },
      });

      const csvText = res.data;

      await axios.post(`${API_URL}/upload-data`, {
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
      alert("❌ CSV upload failed. Backend not reachable.");
      console.error(err);
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

        {/* UPLOAD AREA */}
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

        {/* PREVIEW TABLE */}
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

        {/* PROGRESS BAR */}
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
