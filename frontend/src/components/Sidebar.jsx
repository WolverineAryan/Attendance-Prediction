import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Manual Predict", path: "/manual", icon: "✍️" },
    { name: "CSV Upload", path: "/upload", icon: "📁" },
    { name: "Reports", path: "/reports", icon: "📄" },
    { name: "Students", path: "/students", icon: "👨‍🎓" },

  ];

  return (
    <div
      style={{
        width: 230,
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: 25,
      }}
    >
      <h2 style={{ marginBottom: 40 }}>🎓 APS</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            borderRadius: 10,
            marginBottom: 10,
            textDecoration: "none",
            color: "white",
            background:
              pathname === item.path
                ? "#4f46e5"
                : "transparent",
          }}
        >
          <span>{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
