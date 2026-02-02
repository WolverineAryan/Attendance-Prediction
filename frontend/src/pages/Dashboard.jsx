import { useContext } from "react";
import { DataContext } from "../context/DataContext";

import Layout from "../components/Layout";
import KpiCards from "../components/KpiCards";
import CsvCharts from "../components/CSVCharts"; 
import { exportDashboardAsZip } from "../utils/exportDashboardZip";
import Chatbot from "../components/ChatBot";
<Chatbot />

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>Dashboard</h1>

      {/* ✅ KPI CARDS (ONLY ONCE) */}
      <KpiCards data={csvData} />

      
<button
  onClick={exportDashboardAsZip}
  style={{
    padding: "12px 20px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 25,
    fontWeight: 600,
  }}
>
  📦 Export Dashboard Images (ZIP)
</button>

      {/* ✅ CHARTS (ONLY ONCE) */}
      {csvData.length > 0 && (
        <CsvCharts data={csvData} />
      )}
    </Layout>
  );
  
}
