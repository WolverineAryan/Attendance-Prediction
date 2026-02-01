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

/* ================= CLEAN NUMBER ================= */
const cleanNumber = (value) => {
  if (value === null || value === undefined) return 0;

  return (
    Number(
      String(value)
        .replace("%", "")
        .replace(",", "")
        .trim()
    ) || 0
  );
};

/* ================= FIND COLUMN ================= */
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


/* ================= NORMALIZE RISK ================= */
const normalizeRisk = (value) => {
  if (!value) return "Low";

  const v = value.toString().toLowerCase();

  if (v.includes("high")) return "High";
  if (v.includes("medium")) return "Medium";
  if (v.includes("low")) return "Low";

  return "Low";
};

/* ================================================= */
/* ================= MAIN COMPONENT ================= */
/* ================================================= */

export default function CsvCharts({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  /* ========== NORMALIZED DATA ========== */
  const chartData = data.map((row, i) => ({
    name:
      row.student_id ||
      row.Student_ID ||
      row.id ||
      `Student ${i + 1}`,

    attendance: cleanNumber(
      findColumn(row, ["attendance", "percent", "present"])
    ),

    late: cleanNumber(
      findColumn(row, ["late"])
    ),

    leaves: cleanNumber(
      findColumn(row, ["leave", "absent"])
    ),

    discipline: cleanNumber(
      findColumn(row, ["discipline", "behavior", "score"])
    ),

    risk: normalizeRisk(
      findColumn(row, ["risk"]) || row.risk
    ),
  }));

  /* ========== PIE DATA ========== */
  const riskCount = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  chartData.forEach((r) => {
    riskCount[r.risk]++;
  });

  const pieData = Object.keys(riskCount).map((k) => ({
    name: k,
    value: riskCount[k],
  }));

  /* ================= UI ================= */
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
      <ChartCard title="Attendance Percentage">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
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

      {/* ================= RISK PIE ================= */}
      <div id="risk-pie-chart">
      <ChartCard title="Risk Distribution">
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
                <Cell
                  key={i}
                  fill={COLORS[e.name]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
      </div>

      {/* ================= LINE ================= */}
      <div id="late-leaves-chart">
      <ChartCard title="Late vs Leaves">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              dataKey="late"
              stroke="#f59e0b"
              strokeWidth={3}
            />
            <Line
              dataKey="leaves"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
      </div>
      
      {/* ================= DISCIPLINE ================= */}
      <div id="discipline-chart">
      <ChartCard title="Discipline Score">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="disciplineFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="discipline"
              stroke="#22c55e"
              fill="url(#disciplineFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
      </div>
    </div>
  );
}

/* ================= CARD ================= */

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
