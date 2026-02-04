import React from "react";
import { useState } from "react";
import axios from "axios";

export default function PredictionCard() {
  const [form, setForm] = useState({
    attendance: "",
    late_days: "",
    leaves: "",
    discipline_score: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const predict = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/predict",
        form
      );
      setResult(res.data);
    } catch (err) {
      alert("Backend not reachable");
    }
  };

  return (
    <div className="card">
      <h2>Attendance Risk Prediction</h2>

      <input
        name="attendance"
        placeholder="Attendance %"
        onChange={handleChange}
      />

      <input
        name="late_days"
        placeholder="Late Days"
        onChange={handleChange}
      />

      <input
        name="leaves"
        placeholder="Leaves"
        onChange={handleChange}
      />

      <input
        name="discipline_score"
        placeholder="Discipline Score"
        onChange={handleChange}
      />

      <button onClick={predict}>Predict</button>

      {result && (
        <div className="result">
          <h3>Risk Level: {result.risk_level}</h3>
          <p>Reason: {result.risk_reason}</p>
        </div>
      )}
    </div>
  );
}
