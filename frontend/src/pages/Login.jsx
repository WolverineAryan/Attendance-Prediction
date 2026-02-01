import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={wrap}>
      <div style={card}>
        <h2>Admin Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={() => nav("/dashboard")}>
          Login
        </button>
      </div>
    </div>
  );
}

const wrap = {
  height: "100vh",
  background: "linear-gradient(120deg,#020617,#0f172a)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  background: "#020617",
  padding: 40,
  borderRadius: 18,
  width: 320,
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: 15,
};
