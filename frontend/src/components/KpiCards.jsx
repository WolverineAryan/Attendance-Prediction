export default function KpiCards({ data }) {
  const total = data.length;
  const high = data.filter((d) => d.risk === "High").length;
  const medium = data.filter((d) => d.risk === "Medium").length;
  const low = data.filter((d) => d.risk === "Low").length;

  const cards = [
    { title: "Students", value: total, color: "#6366f1" },
    { title: "High Risk", value: high, color: "#ef4444" },
    { title: "Medium Risk", value: medium, color: "#f59e0b" },
    { title: "Low Risk", value: low, color: "#22c55e" },
  ];

  return (
    <div className="grid fade-in">
      {cards.map((c) => (
        <div className="card" key={c.title}>
          <h4 style={{ color: "#6b7280" }}>{c.title}</h4>
          <h1 style={{ color: c.color }}>{c.value}</h1>
        </div>
      ))}
    </div>
  );
}
