import { useContext } from "react";
import { DataContext } from "../context/DataContext";

import Layout from "../components/Layout";
import KpiCards from "../components/KpiCards";
import CsvCharts from "../components/CSVCharts";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  return (
    <Layout>
      <KpiCards data={csvData} />

      <div className="card fade-in">
        <h3 style={{ marginBottom: 20 }}>
          Attendance Analytics
        </h3>
      <h1 style={{ marginBottom: 20 }}>Dashboard</h1>

  {/* KPI cards */}
  <div className="grid">
    <div className="card">
      <h4>Total Students</h4>
      <h1>120</h1>
    </div>

    <div className="card">
      <h4>High Risk</h4>
      <h1 style={{ color: "#ef4444" }}>18</h1>
    </div>

    <div className="card">
      <h4>Medium Risk</h4>
      <h1 style={{ color: "#f59e0b" }}>32</h1>
    </div>

    <div className="card">
      <h4>Low Risk</h4>
      <h1 style={{ color: "#22c55e" }}>70</h1>
    </div>
  </div>

  {/* Chart section */}
  <div className="card" style={{ marginTop: 30 }}>
    <h3 style={{ marginBottom: 15 }}>
      Attendance Overview
    </h3>

    <CsvCharts data={csvData} />
  </div>

        <CsvCharts data={csvData} />
      </div>
    </Layout>
    
  );
}
  