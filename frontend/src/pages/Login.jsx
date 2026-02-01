import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={title}>Admin Login</h2>

        <input
          style={input}
          placeholder="Email address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button style={button} onClick={() => nav("/dashboard")}>
          Login
        </button>

        <p style={footerText}>
          Attendance Prediction System
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  height: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 360,
  padding: "40px 35px",
  borderRadius: 20,
  background: "#020617",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: 18,
  boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
};

const title = {
  textAlign: "center",
  marginBottom: 10,
  fontSize: 26,
  fontWeight: 700,
};

const input = {
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #1e293b",
  background: "#020617",
  color: "white",
  fontSize: 15,
  outline: "none",
};

const button = {
  marginTop: 10,
  padding: "14px",
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(135deg,#6366f1,#22c55e)",
  color: "white",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
};

const footerText = {
  marginTop: 15,
  textAlign: "center",
  fontSize: 12,
  color: "#94a3b8",
};
