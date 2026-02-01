import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.title}>
          🎓 Attendance Prediction System
        </h1>

        <p style={styles.subtitle}>
          AI‑powered platform to analyze attendance,
          predict student risk, and visualize insights.
        </p>

        <ul style={styles.list}>
          <li>✔ Manual Prediction</li>
          <li>✔ CSV Upload Analysis</li>
          <li>✔ ML Risk Classification</li>
          <li>✔ Dashboard & Reports</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2>Admin Login</h2>

        <input placeholder="Email" style={styles.input} />
        <input
          placeholder="Password"
          type="password"
          style={styles.input}
        />

        <Link to="/dashboard">
          <button style={styles.button}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    color: "rgba(107, 127, 255, 0.93)",
    padding: 40,
  },

  left: {
    maxWidth: 500,
  },

  title: {
    fontSize: 48,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    opacity: 0.9,
  },

  list: {
    marginTop: 30,
    lineHeight: "2rem",
    fontSize: 18,
  },

  card: {
    width: 360,
    padding: 35,
    background: "rgba(17, 48, 255, 0.15)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.27)",
  },

  input: {
    width: "100%",
    padding: 14,
    marginTop: 15,
    borderRadius: 10,
    border: "none",
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: 25,
    padding: 14,
    background: "#4f46e5",
    border: "none",
    color: "white",
    borderRadius: 10,
    fontSize: 16,
    cursor: "pointer",
  },
};
