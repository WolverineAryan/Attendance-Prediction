import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Manual", path: "/manual", icon: "✍️" },
    { name: "CSV Upload", path: "/upload", icon: "📁" },
    { name: "Students", path: "/reports", icon: "👨‍🎓" },
  ];

  return (
    <div
      style={{
        width: collapsed ? 80 : 230,
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: 20,
        transition: "0.3s",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {!collapsed && <h2>🎓 APS</h2>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ☰
        </button>
      </div>

      {/* Menu */}
      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 12,
            padding: "14px 16px",
            borderRadius: 10,
            marginBottom: 10,
            textDecoration: "none",
            color: "white",
            background:
              pathname === item.path
                ? "#4f46e5"
                : "transparent",
            transition: "0.25s",
          }}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          {!collapsed && item.name}
        </Link>
      ))}
    </div>
  );
}
