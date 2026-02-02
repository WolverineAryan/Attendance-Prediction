import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

/* ✅ backend url */
const API_URL = "http://localhost:5000";

export default function ManualPredict() {
  const [form, setForm] = useState({
    attendance: "",
    late: "",
    leaves: "",
    discipline: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= PREDICT ================= */
  const predict = async () => {
    const { attendance, late, leaves, discipline } = form;

    // ✅ empty validation
    if (
      attendance === "" ||
      late === "" ||
      leaves === "" ||
      discipline === ""
    ) {
      alert("⚠️ Please enter all details");
      return;
    }

    // ✅ numeric validation
    if (
      attendance < 0 ||
      attendance > 100 ||
      late < 0 ||
      leaves < 0 ||
      discipline < 0
    ) {
      alert("⚠️ Please enter valid numeric values");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/predict-manual`,
        {
          attendance: Number(attendance),
          late: Number(late),
          leaves: Number(leaves),
          discipline: Number(discipline),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      alert("❌ Prediction failed. Backend not reachable.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <Layout>
      <div className="page-center">
        <h1 style={{ marginBottom: 30 }}>
          Manual Attendance Prediction
        </h1>

        {/* ================= FORM ================= */}
        <div className="glass-card fade-in center-card">
          <label>Attendance %</label>
          <input
            name="attendance"
            type="number"
            value={form.attendance}
            placeholder="e.g. 75"
            onChange={handleChange}
          />

          <label>Late Days</label>
          <input
            name="late"
            type="number"
            value={form.late}
            placeholder="e.g. 5"
            onChange={handleChange}
          />

          <label>Total Leaves</label>
          <input
            name="leaves"
            type="number"
            value={form.leaves}
            placeholder="e.g. 3"
            onChange={handleChange}
          />

          <label>Discipline Score</label>
          <input
            name="discipline"
            type="number"
            value={form.discipline}
            placeholder="e.g. 15"
            onChange={handleChange}
          />

          <button onClick={predict} disabled={loading}>
            {loading ? "Predicting..." : "Predict Risk"}
          </button>
        </div>

        {/* ================= RESULT ================= */}
        {result && (
          <div
            className="glass-card fade-in center-card result-center"
            style={{
              marginTop: 30,
              borderLeft:
                result.risk === "High"
                  ? "6px solid #ef4444"
                  : result.risk === "Medium"
                  ? "6px solid #f59e0b"
                  : "6px solid #22c55e",
            }}
          >
            <h2>
              Risk Level:
              <span
                className={`badge ${
                  result.risk === "High"
                    ? "high"
                    : result.risk === "Medium"
                    ? "medium"
                    : "low"
                }`}
                style={{ marginLeft: 12 }}
              >
                {result.risk}
              </span>
            </h2>

            <p style={{ marginTop: 12 }}>
              {result.reason}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
