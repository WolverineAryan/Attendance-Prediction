import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { DataContext } from "../context/DataContext";
import Papa from "papaparse";
import axios from "axios";

export default function UploadCSV() {
  const { csvData, setCsvData } = useContext(DataContext);
  const [fileName, setFileName] = useState("");

 const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setFileName(file.name);

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
  "http://localhost:5000/predict-csv",
  formData,
  { responseType: "blob" }
);

  const text = await res.data.text();

  Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      setCsvData(result.data);
    },
  });
};


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

  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>
        CSV Attendance Prediction
      </h1>

      {/* UPLOAD AREA */}
      <div className="upload-box fade-in">
        <h2>📁 Drop CSV file here</h2>
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          Supported format: .csv
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          style={{ marginTop: 20 }}
        />

        {fileName && (
          <p style={{ marginTop: 15 }}>
            Selected: <b>{fileName}</b>
          </p>
        )}
      </div>

      {/* TABLE */}
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
                  {Object.entries(row).map(([k, v]) => (
                    <td key={k}>
                      {k === "risk" ? (
                        <span
                          className={`badge ${
                            v === "High"
                              ? "high"
                              : v === "Medium"
                              ? "medium"
                              : "low"
                          }`}
                        >
                          {v}
                        </span>
                      ) : (
                        v
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
