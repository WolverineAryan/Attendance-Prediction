import React, { useMemo } from "react";

/* ===== SMART COLUMN FINDER ===== */
function findColumn(row, keywords) {
  if (!row) return null;

  const keys = Object.keys(row);

  for (let key of keys) {
    const clean = key.toLowerCase().replace(/[%_ ]/g, "");

    for (let k of keywords) {
      if (clean.includes(k)) return key;
    }
  }

  return null;
}

/* ===== SMART ATTENDANCE EXTRACTOR ===== */
function getAttendance(row) {
  const col = findColumn(row, ["attendance", "attend", "percent", "present"]);

  if (!col) return 0;

  let value = Number(String(row[col]).replace(/[% ,]/g, "")) || 0;

  // If value looks like days instead of percent (> 100) normalize
  if (value > 100) {
    const totalCol = findColumn(row, ["totalworkingdays", "totaldays"]);

    if (totalCol) {
      const total = Number(row[totalCol]) || 0;
      if (total > 0) {
        value = (value / total) * 100;
      }
    } else {
      // Clamp to 100 if no total days available
      value = Math.min(value, 100);
    }
  }

  return value;
}

/* ===== SUPER ROBUST RISK EXTRACTOR ===== */
function getRisk(row) {
  if (!row) return "";

  const possible = [
    row["risk"],
    row["Risk"],
    row["Predicted_Risk"],
    row["predicted_risk"],
    row["Risk_Level"],
    row["risklevel"],
    row["attendancerisk"]
  ];

  for (let val of possible) {
    if (val !== undefined && val !== null) {
      let v = String(val).toLowerCase().trim();

      if (v.includes("high")) return "high";
      if (v.includes("medium")) return "medium";
      if (v.includes("low")) return "low";

      // numeric fallback
      if (v === "2" || v === "1") return "high";
      if (v === "0") return "low";
    }
  }

  return "";
}

/* ===== KPI COMPONENT ===== */
function KpiCards({ data = [] }) {
  const stats = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        total: 0,
        avgAttendance: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
      };
    }

    let totalAttendance = 0;
    let highRisk = 0;
    let mediumRisk = 0;
    let lowRisk = 0;

    data.forEach((row) => {
      totalAttendance += getAttendance(row);

      const risk = getRisk(row);

      if (risk === "high") highRisk++;
      else if (risk === "medium") mediumRisk++;
      else if (risk === "low") lowRisk++;
    });

    const avg = totalAttendance / data.length;

    return {
      total: data.length,
      avgAttendance: avg > 100 ? 100 : avg.toFixed(2),
      highRisk,
      mediumRisk,
      lowRisk,
    };
  }, [data]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
      }}
    >
      <Card title="Total Records" value={stats.total} />
      <Card title="Avg Attendance %" value={stats.avgAttendance} />
      <Card title="High Risk Students" value={stats.highRisk} />
      <Card title="Medium Risk Students" value={stats.mediumRisk} />
      <Card title="Low Risk Students" value={stats.lowRisk} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: "#ffffff",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default React.memo(KpiCards);
