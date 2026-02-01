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
} from "recharts";

const COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

export default function CsvCharts({ data }) {
  if (!data || data.length === 0) return null;

  // -------- Risk Pie Data ----------
  const riskCount = { High: 0, Medium: 0, Low: 0 };

  data.forEach((row) => {
    if (row.risk in riskCount) {
  riskCount[row.risk]++;
} });

  const pieData = Object.keys(riskCount).map((k) => ({
    name: k,
    value: riskCount[k],
  }));

  // -------- Attendance Bar Data -----
const barData = data.map((row, i) => ({
  name: row.student_id || `S${i + 1}`,
  attendance: row.attendance,
}));


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 30,
        marginTop: 40,
      }}
    >
      {/* Attendance Bar Chart */}
      <div style={card}>
        <h3>Attendance Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="attendance"
              fill="#4f46e5"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Pie Chart */}
      <div style={card}>
        <h3>Risk Classification</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              animationDuration={1200}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.name]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  padding: 25,
  borderRadius: 16,
  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
};
