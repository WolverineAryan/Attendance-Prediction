import { useContext } from "react";
import Papa from "papaparse";
import Layout from "../components/Layout";
import CsvCharts from "../components/CSVCharts";
import { DataContext } from "../context/DataContext";

export default function UploadCSV() {
  const { csvData, setCsvData } = useContext(DataContext);

  // ✅ download CSV
  const downloadCSV = () => {
    if (!csvData.length) return;

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

  // ✅ upload CSV
  const handleUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const formatted = res.data.map((row) => ({
          student_id: row.Student_ID,
          attendance: Number(row.Attendance_Percentage),
          late: Number(row.Late_Days),
          leaves: Number(row.Leaves),
          discipline: Number(row.Discipline_Score),
          risk: row.Risk_Level,
        }));

        setCsvData(formatted);
      },
    });
  };

  // ✅ RETURN MUST BE INSIDE FUNCTION
  return (
    <Layout>
      <h1>Upload Attendance CSV</h1>

      {/* Upload box */}
      <div
        style={{
          marginTop: 30,
          padding: 60,
          border: "2px dashed #6366f1",
          borderRadius: 20,
          textAlign: "center",
          background: "#eef2ff",
        }}
      >
        <h2>Drop CSV file here</h2>

        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          style={{ marginTop: 20 }}
        />
      </div>

      {/* Charts */}
      <CsvCharts data={csvData} />

      {/* Download button */}
      {csvData.length > 0 && (
        <button
          onClick={downloadCSV}
          style={{
            marginTop: 30,
            padding: "14px 30px",
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ⬇ Download Prediction CSV
        </button>
      )}
    </Layout>
  );
}
