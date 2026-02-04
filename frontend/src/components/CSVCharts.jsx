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

/* ================= COLORS ================= */
const COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

/* ================= HELPERS ================= */
const cleanNumber = (value) =>
  Number(String(value || 0).replace("%", "").replace(",", "").trim()) || 0;

const findColumn = (row, keywords) => {
  const cols = Object.keys(row);
  return row[
    cols.find((c) =>
      keywords.some((k) =>
        c.toLowerCase().replace(/\s|%|_/g, "").includes(k)
      )
    )
  ];
};

const normalizeRisk = (value) => {
  if (!value) return "Low";
  const v = value.toString().toLowerCase();
  if (v.includes("high")) return "High";
  if (v.includes("medium")) return "Medium";
  if (v.includes("low")) return "Low";
  return "Low";
};

/* ================================================= */

export default function CsvCharts({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const isDark = document.body.classList.contains("dark");

  const axisColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#334155" : "#e5e7eb";
  const tooltipBg = isDark ? "#020617" : "#ffffff";
  const tooltipText = isDark ? "#ffffff" : "#111827";

  const chartData = data.map((row, i) => ({
    name:
      row.student_id ||
      row.Student_ID ||
      row.id ||
      `Student ${i + 1}`,

    attendance: cleanNumber(
      findColumn(row, ["attendance", "attend", "percent", "present"])
    ),

    late: cleanNumber(findColumn(row, ["late"])),

    leaves: cleanNumber(findColumn(row, ["leave", "absent"])),

    discipline: cleanNumber(
      findColumn(row, ["discipline", "behavior", "score", "marks"])
    ),

    risk: normalizeRisk(findColumn(row, ["risk"]) || row.risk),
  }));

  const riskCount = { High: 0, Medium: 0, Low: 0 };
  chartData.forEach((r) => riskCount[r.risk]++);

  const pieData = Object.keys(riskCount).map((k) => ({
    name: k,
    value: riskCount[k],
  }));

  const tooltipStyle = {
    backgroundColor: tooltipBg,
    border: "none",
    borderRadius: 10,
    color: tooltipText,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: 30,
        marginTop: 40,
      }}
    >
      {/* ================= ATTENDANCE ================= */}
      <div id="attendance-chart">
      <ChartCard dark={isDark} title="Attendance Percentage">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor }} />
            <YAxis domain={[0, 100]} tick={{ fill: axisColor }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />

            <Bar
              dataKey="attendance"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      </div>

      {/* ================= PIE ================= */}
      <div id='risk-pie-chart'>
      <ChartCard dark={isDark} title="Risk Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={4}
            >
              {pieData.map((e, i) => (
                <Cell key={i} fill={COLORS[e.name]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>

      {/* ================= LINE ================= */}
    <div id='late-leaves-chart'>
      <ChartCard dark={isDark} title="Late vs Leaves">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor }} />
            <YAxis tick={{ fill: axisColor }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line dataKey="late" stroke="#f59e0b" strokeWidth={3} />
            <Line dataKey="leaves" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>

      {/* ================= AREA ================= */}
    <div id='discipline-chart'>
      <ChartCard dark={isDark} title="Discipline Score">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="disc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: axisColor }} />
            <YAxis domain={[0, 100]} tick={{ fill: axisColor }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="discipline"
              stroke="#22c55e"
              fill="url(#disc)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
    </div>
  );
}

/* ================= CARD ================= */

function ChartCard({ title, children, dark }) {
  return (
    <div
      style={{
        background: dark ? "#020617" : "#ffffff",
        color: dark ? "#f8fafc" : "#111827",
        padding: 25,
        borderRadius: 18,
        boxShadow: dark
          ? "0 12px 35px rgba(0,0,0,0.6)"
          : "0 10px 25px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: 15 }}>{title}</h3>
      {children}
    </div>
  );
}
