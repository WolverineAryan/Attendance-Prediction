import { Link } from "react-router-dom";

const linkStyle = {
  padding: "14px 20px",
  color: "#c7d2fe",
  textDecoration: "none",
  display: "block",
};

export default function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "#111827",
        color: "#fff",
        paddingTop: 20,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Dashboard</h2>

      <Link to="/dashboard" style={linkStyle}>🏠 Overview</Link>
      <Link to="/manual" style={linkStyle}>✍ Manual Predict</Link>
      <Link to="/upload" style={linkStyle}>📁 CSV Upload</Link>
    </div>
  );
}
