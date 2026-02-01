import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="nav">
        <h2>AI Attendance</h2>
        <button onClick={() => navigate("/login")}>Login</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>
          AI‑Powered <span>Attendance Prediction</span>
        </h1>

        <p>
          Predict student attendance risk using machine learning,
          CSV uploads and real‑time analytics.
        </p>

        <div className="hero-btns">
          <button
            className="primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/upload")}
          >
            Upload CSV
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="card" onClick={() => navigate("/manual")}>
          <h3>Manual Prediction</h3>
          <p>Enter attendance data manually.</p>
        </div>

        <div className="card" onClick={() => navigate("/upload")}>
          <h3>CSV Upload</h3>
          <p>Upload file and auto‑predict all students.</p>
        </div>

        <div className="card" onClick={() => navigate("/dashboard")}>
          <h3>Analytics Dashboard</h3>
          <p>Charts, insights and downloads.</p>
        </div>
      </section>

    </div>
  );
}
