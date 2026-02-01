import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    // later you can clear auth token here
    navigate("/");
  };

  return (
    <div
      style={{
        marginBottom: 25,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", color: "blueviolet"
      }}
    >
      <h2> </h2>

      <div style={{ display: "flex", gap: 15 }}>
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
