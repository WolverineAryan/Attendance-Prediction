import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { DataContext } from "../context/DataContext";
import Papa from "papaparse";
import axios from "axios";

/* ✅ change only this when backend URL changes */
const API_URL = "https://attendance-prediction.onrender.com";

export default function UploadCSV() {
  const { csvData, setCsvData } = useContext(DataContext);

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  // =======================
  // CSV UPLOAD
  // =======================
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${API_URL}/predict-csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "text", // 🔥 VERY IMPORTANT
        }
      );

      // backend returns CSV text
      Papa.parse(res.data, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setCsvData(result.data);
        },
      });

    } catch (err) {
      alert("❌ CSV upload failed. Check backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // DOWNLOAD CSV
  // =======================
  const downloadCSV = () => {
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance_prediction.csv";
    link.click();
  };

  // =======================
  // UI
  // =======================
  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>
        CSV Attendance Prediction
      </h1>

      {/* ================= UPLOAD BOX ================= */}
      <div className="upload-box fade-in">
        <h2>📁 Upload CSV File</h2>

        <p style={{ marginTop: 8, opacity: 0.8 }}>
          Any column names supported
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          style={{ marginTop: 20 }}
        />

        {fileName && (
          <p style={{ marginTop: 15 }}>
            Selected file: <b>{fileName}</b>
          </p>
        )}

        {loading && (
          <p style={{ marginTop: 15 }}>
            ⏳ Predicting attendance...
          </p>
        )}
      </div>

      {/* ================= RESULT TABLE ================= */}
      {csvData.length > 0 && (
        <div className="card fade-in" style={{ marginTop: 40 }}>
          <h3>Prediction Results</h3>

          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {csvData.map((row, i) => (
                <tr key={i}>
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key}>
                      {key.toLowerCase() === "risk" ? (
                        <span
                          className={`badge ${
                            value === "High"
                              ? "high"
                              : value === "Medium"
                              ? "medium"
                              : "low"
                          }`}
                        >
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={downloadCSV}
            style={{ marginTop: 25 }}
          >
            ⬇ Download Prediction CSV
          </button>
        </div>
      )}
    </Layout>
  );
}
