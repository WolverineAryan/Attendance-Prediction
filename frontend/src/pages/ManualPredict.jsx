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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const predict = async () => {
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
  };

  return (
    <Layout>
      <h1>Manual Attendance Prediction</h1>

      <div
        style={{
          maxWidth: 500,
          marginTop: 30,
          padding: 30,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        }}
      >
        {["attendance", "late", "leaves", "discipline"].map((f) => (
          <div key={f} style={{ marginBottom: 15 }}>
            <label style={{ fontWeight: 600 }}>
              {f.toUpperCase()}
            </label>
            <input
              type="number"
              name={f}
              value={form[f]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />
          </div>
        ))}

        <button
          onClick={predict}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 14,
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Predict Risk
        </button>

        {result && (
          <div
            style={{
              marginTop: 25,
              padding: 20,
              borderRadius: 12,
              background:
                result.risk === "High"
                  ? "#fee2e2"
                  : result.risk === "Medium"
                  ? "#ffedd5"
                  : "#dcfce7",
              color:
                result.risk === "High"
                  ? "#b91c1c"
                  : result.risk === "Medium"
                  ? "#c2410c"
                  : "#15803d",
              fontWeight: 700,
            }}
          >
            <h2>Risk: {result.risk}</h2>
            <p>{result.reason}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
