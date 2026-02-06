import React, { useState } from "react";
import api from "../utils/axiosConfig";
import { AlertTriangle, CheckCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function PredictionCard() {
  const [form, setForm] = useState({
    attendance: "",
    late_days: "",
    leaves: "",
    discipline_score: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const { attendance, late_days, leaves, discipline_score } = form;

    if (!attendance || !late_days || !leaves || !discipline_score) {
      alert("⚠️ Please fill all fields");
      return false;
    }

    if (
      attendance < 0 || attendance > 100 ||
      late_days < 0 ||
      leaves < 0 ||
      discipline_score < 0
    ) {
      alert("⚠️ Please enter valid numeric values");
      return false;
    }

    return true;
  };

  const predict = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_URL}/predict-manual`, {
        attendance: Number(form.attendance),
        late: Number(form.late_days),
        leaves: Number(form.leaves),
        discipline: Number(form.discipline_score)
      });

      setResult(res.data);
    } catch (err) {
      alert("❌ Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="group bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 p-8 rounded-3xl shadow-2xl text-white w-full max-w-xl transition duration-300 hover:scale-[1.02] relative overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition duration-300 bg-gradient-to-r from-lime-400 to-emerald-500 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-6 tracking-wider">
            Attendance Risk Prediction
          </h2>

          <div className="space-y-4">

            <input
              name="attendance"
              type="number"
              placeholder="Attendance %"
              className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-200 outline-none hover:bg-white/30 transition"
              onChange={handleChange}
            />

            <input
              name="late_days"
              type="number"
              placeholder="Late Days"
              className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-200 outline-none hover:bg-white/30 transition"
              onChange={handleChange}
            />

            <input
              name="leaves"
              type="number"
              placeholder="Leaves"
              className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-200 outline-none hover:bg-white/30 transition"
              onChange={handleChange}
            />

            <input
              name="discipline_score"
              type="number"
              placeholder="Discipline Score"
              className="w-full p-3 rounded-xl bg-white/20 placeholder-gray-200 outline-none hover:bg-white/30 transition"
              onChange={handleChange}
            />

            <button
              onClick={predict}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-lime-300 text-green-900 hover:bg-lime-400 transition shadow-lg hover:shadow-2xl"
            >
              {loading ? "Predicting..." : "Predict Risk"}
            </button>
          </div>

          {result && (
            <div
              className="mt-6 p-5 rounded-xl bg-white/20 backdrop-blur-lg transition fade-in"
              style={{
                borderLeft:
                  result.risk === "High"
                    ? "6px solid #ef4444"
                    : result.risk === "Medium"
                    ? "6px solid #f59e0b"
                    : "6px solid #22c55e"
              }}
            >
              <div className="flex items-center gap-3">
                {result.risk === "High" ? (
                  <AlertTriangle className="text-red-400" />
                ) : (
                  <CheckCircle className="text-lime-300" />
                )}

                <h3 className="text-xl font-semibold">
                  Risk Level: {result.risk}
                </h3>
              </div>

              <p className="mt-2 text-gray-100">{result.reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
