import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "Mon", attendance: 80 },
  { name: "Tue", attendance: 75 },
  { name: "Wed", attendance: 90 },
  { name: "Thu", attendance: 60 },
  { name: "Fri", attendance: 85 },
];

const pieData = [
  { name: "Low Risk", value: 70 },
  { name: "Medium Risk", value: 32 },
  { name: "High Risk", value: 18 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function Charts() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 30,
        marginTop: 40,
      }}
    >
      {/* BAR CHART */}
      <div style={cardStyle}>
        <h3>Weekly Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
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

      {/* PIE CHART */}
      <div style={cardStyle}>
        <h3>Student Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              animationDuration={1400}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
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

const cardStyle = {
  background: "#fff",
  padding: 25,
  borderRadius: 16,
  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
};
