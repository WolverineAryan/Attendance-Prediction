import { useContext } from "react";
import Layout from "../components/Layout";
import Charts from "../components/Charts";
import CsvCharts from "../components/CSVCharts";
import SummaryCards from "../components/SummaryCards";
import { DataContext } from "../context/DataContext";

export default function Dashboard() {
  // ✅ GET CSV DATA FROM CONTEXT
  const { csvData } = useContext(DataContext);

  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>Dashboard Overview</h1>

      {/* STATIC INFO CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        <Card title="Total Students" value={csvData.length || 0} />
        <Card
          title="High Risk"
          value={csvData.filter((s) => s.risk === "High").length}
          color="#ef4444"
        />
        <Card
          title="Medium Risk"
          value={csvData.filter((s) => s.risk === "Medium").length}
          color="#f59e0b"
        />
        <Card
          title="Low Risk"
          value={csvData.filter((s) => s.risk === "Low").length}
          color="#22c55e"
        />
      </div>

      {/* ✅ AUTO SUMMARY FROM CSV */}
      <SummaryCards data={csvData} />

      {/* ✅ CSV BASED CHARTS */}
      <CsvCharts data={csvData} />

      {/* ✅ OPTIONAL STATIC DEMO CHARTS */}
      <Charts />
    </Layout>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function Card({ title, value, color = "#4f46e5" }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: 25,
        borderRadius: 14,
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ color: "#6b7280", marginBottom: 5 }}>
        {title}
      </h4>
      <h1 style={{ color }}>{value}</h1>
    </div>
  );
}
