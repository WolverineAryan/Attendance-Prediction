import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function ManualPredict() {
  const [form, setForm] = useState({
    attendance: "",
    late: "",
    leaves: "",
    discipline: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const predict = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/predict-manual",
        {
          attendance: Number(form.attendance),
          late: Number(form.late),
          leaves: Number(form.leaves),
          discipline: Number(form.discipline),
        }
      );

      setResult(res.data);
    } catch (err) {
      alert("Backend not responding");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>
        Manual Attendance Prediction
      </h1>

      {/* FORM CARD */}
      <div
        className="card fade-in"
        style={{ maxWidth: 520 }}
      >
        <label>Attendance %</label>
        <input
          name="attendance"
          type="number"
          placeholder="e.g. 75"
          onChange={handleChange}
        />

        <label>Late Days</label>
        <input
          name="late"
          type="number"
          placeholder="e.g. 5"
          onChange={handleChange}
        />

        <label>Total Leaves</label>
        <input
          name="leaves"
          type="number"
          placeholder="e.g. 3"
          onChange={handleChange}
        />

        <label>Discipline Score</label>
        <input
          name="discipline"
          type="number"
          placeholder="e.g. 15"
          onChange={handleChange}
        />

        <button
          onClick={predict}
          disabled={loading}
          style={{ marginTop: 15 }}
        >
          {loading ? "Predicting..." : "Predict Risk"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div
          className="card fade-in"
          style={{
            maxWidth: 520,
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

          <p style={{ marginTop: 10 }}>
            {result.reason}
          </p>
        </div>
      )}
    </Layout>
  );
}
