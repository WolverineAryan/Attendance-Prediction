import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

/* ===== COLORS ===== */
const COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

/* ===== HELPERS ===== */

const cleanNumber = (value) =>
  Number(String(value || 0).replace(/[% ,]/g, "")) || 0;

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

/* ----- Attendance Normalizer ----- */
function getAttendance(row) {
  const col = findColumn(row, ["attendance", "attend", "percent", "present"]);

  if (!col) return 0;

  let value = cleanNumber(row[col]);

  if (value > 100) {
    const totalCol = findColumn(row, ["totalworkingdays", "totaldays"]);

    if (totalCol) {
      const total = cleanNumber(row[totalCol]);
      if (total > 0) value = (value / total) * 100;
    } else {
      value = Math.min(value, 100);
    }
  }

  return value;
}

/* ----- Risk Normalizer ----- */
function normalizeRisk(value) {
  if (!value) return "Low";

  const v = String(value).toLowerCase();

  if (v.includes("high") || v === "2" || v === "1") return "High";
  if (v.includes("medium")) return "Medium";
  if (v.includes("low") || v === "0") return "Low";

  return "Low";
}

function getRisk(row) {
  const col = findColumn(row, ["risk", "predictedrisk", "risklevel"]);

  return normalizeRisk(col ? row[col] : "");
}

/* ===== MAIN COMPONENT ===== */

export default React.memo(function CsvCharts({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const MAX_ROWS = 200;
  const safeData = data.length > MAX_ROWS ? data.slice(0, MAX_ROWS) : data;

  const isDark = document.body.classList.contains("dark");

  const axisColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#334155" : "#e5e7eb";

  /* ----- TRANSFORM DATA ----- */
  const chartData = React.useMemo(() => {
    return safeData.map((row, i) => ({
      name: row.studentid || row.Student_ID || `S${i + 1}`,

      attendance: getAttendance(row),

      late: cleanNumber(findColumn(row, ["late"]) ? row[findColumn(row, ["late"])] : 0),

      leaves: cleanNumber(
        findColumn(row, ["leave", "absent"])
          ? row[findColumn(row, ["leave", "absent"])]
          : 0
      ),

      discipline: cleanNumber(
        findColumn(row, ["discipline", "behavior", "score"])
          ? row[findColumn(row, ["discipline", "behavior", "score"])]
          : 0
      ),

      risk: getRisk(row),
    }));
  }, [safeData]);

  /* ----- PIE DATA ----- */
  const pieData = React.useMemo(() => {
    const count = { High: 0, Medium: 0, Low: 0 };

    chartData.forEach((r) => {
      count[r.risk] = (count[r.risk] || 0) + 1;
    });

    return Object.keys(count).map((k) => ({
      name: k,
      value: count[k],
    }));
  }, [chartData]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: 30,
        marginTop: 40,
      }}
    >
      {/* Attendance Bar Chart */}
      <ChartCard title="Attendance Percentage">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor }} />
            <YAxis domain={[0, 100]} tick={{ fill: axisColor }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Risk Pie Chart */}
      <ChartCard title="Risk Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Late vs Leaves Line Chart */}
      <ChartCard title="Late Days vs Leaves">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor }} />
            <YAxis tick={{ fill: axisColor }} />
            <Tooltip />
            <Legend />
            <Line dataKey="late" stroke="#f59e0b" strokeWidth={3} />
            <Line dataKey="leaves" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Discipline Area Chart */}
      <ChartCard title="Discipline Score">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor }} />
            <YAxis tick={{ fill: axisColor }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="discipline"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
});

/* ===== CARD COMPONENT ===== */
function ChartCard({ title, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: 25,
        borderRadius: 18,
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: 15 }}>{title}</h3>
      {children}
    </div>
  );
}
