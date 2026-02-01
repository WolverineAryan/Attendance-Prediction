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

const COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

export default function CsvCharts({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  // ================= SAFE DATA =================
  const chartData = data.map((row, i) => ({
    name: row.student_id
      ? String(row.student_id)
      : `Student ${i + 1}`,

    attendance: Number(row.attendance) || 0,
    late: Number(row.late) || 0,
    leaves: Number(row.leaves) || 0,
    discipline: Number(row.discipline) || 0,

    risk: row.risk || "Low",
  }));

  // ================= PIE =================
  const riskCount = { High: 0, Medium: 0, Low: 0 };

  chartData.forEach((r) => {
    if (riskCount[r.risk] !== undefined) {
      riskCount[r.risk]++;
    }
  });

  const pieData = Object.keys(riskCount).map((k) => ({
    name: k,
    value: riskCount[k],
  }));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: 30,
        marginTop: 40,
      }}
    >
      {/* ================= 1. BAR ================= */}
      <ChartCard title="Attendance Percentage">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
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

      {/* ================= 2. PIE ================= */}
      <ChartCard title="Risk Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
            >
              {pieData.map((e, i) => (
                <Cell key={i} fill={COLORS[e.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ================= 3. LINE ================= */}
      <ChartCard title="Late vs Leaves">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="late"
              stroke="#f59e0b"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="leaves"
              stroke="#ef4444"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ================= 4. AREA ================= */}
      <ChartCard title="Discipline Score">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="disc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

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
