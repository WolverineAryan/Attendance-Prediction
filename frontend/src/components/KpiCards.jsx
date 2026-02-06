import React, { useMemo } from "react";

function findAttendance(row) {
  const key = Object.keys(row).find(k =>
    k.toLowerCase().includes("attend")
  );

  return key
    ? Number(String(row[key]).replace(/[% ,]/g, "")) || 0
    : 0;
}

function KpiCards({ data = [] }) {

  const stats = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        total: 0,
        avgAttendance: 0,
        highRisk: 0,
        lowRisk: 0,
      };
    }

    let totalAttendance = 0;
    let highRisk = 0;
    let lowRisk = 0;

    data.forEach((row) => {
      totalAttendance += findAttendance(row);

      const risk = String(row.risk || "").toLowerCase();

      if (risk.includes("high")) highRisk++;
      if (risk.includes("low")) lowRisk++;
    });

    return {
      total: data.length,
      avgAttendance: (totalAttendance / data.length).toFixed(2),
      highRisk,
      lowRisk,
    };
  }, [data]);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 20,
    }}>

      <Card title="Total Records" value={stats.total} />
      <Card title="Avg Attendance %" value={stats.avgAttendance} />
      <Card title="High Risk Students" value={stats.highRisk} />
      <Card title="Low Risk Students" value={stats.lowRisk} />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: 20,
      borderRadius: 12,
      background: "#ffffff",
      boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
      textAlign: "center",
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default React.memo(KpiCards);
