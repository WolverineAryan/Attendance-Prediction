import React from "react";
export default function SummaryCards({ data }) {
  if (!data.length) return null;

  const total = data.length;

  const avgAttendance =
    data.reduce((a, b) => a + b.attendance, 0) / total;

  const highRisk = data.filter(
    (s) => s.risk === "High"
  ).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 20,
        marginBottom: 30,
      }}
    >
      <Card title="Total Students" value={total} />
      <Card
        title="Avg Attendance"
        value={avgAttendance.toFixed(1) + "%"}
      />
      <Card
        title="High Risk Students"
        value={highRisk}
        color="#ef4444"
      />
    </div>
  );
}

function Card({ title, value, color = "#4f46e5" }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 16,
        boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ color: "#6b7280" }}>{title}</h4>
      <h1 style={{ color }}>{value}</h1>
    </div>
  );
}
