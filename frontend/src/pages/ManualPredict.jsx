import React from "react";
import { useState } from "react";
import Layout from "../components/Layout.jsx";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
    const { attendance, late, leaves, discipline } = form;

    if (
      attendance === "" ||
      late === "" ||
      leaves === "" ||
      discipline === ""
    ) {
      alert("⚠️ Please enter all details");
      return;
    }

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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
            Manual Attendance Prediction
          </h1>

          <p className="text-gray-600 mt-2">
            Enter student details to analyze risk level using AI model
          </p>
        </div>

        {/* Form Card */}
        <div className="group max-w-2xl mx-auto bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden transition duration-300 hover:scale-[1.01]">

          {/* Glow Hover Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition duration-300 bg-gradient-to-r from-lime-400 to-emerald-500 blur-3xl"></div>

          <div className="relative z-10 space-y-6">

            {/* Input Fields */}
            {[
              {
                label: "Attendance Percentage",
                name: "attendance",
                placeholder: "e.g. 80",
              },
              {
                label: "Late Days",
                name: "late",
                placeholder: "e.g. 4",
              },
              {
                label: "Total Leaves",
                name: "leaves",
                placeholder: "e.g. 2",
              },
              {
                label: "Discipline Score",
                name: "discipline",
                placeholder: "e.g. 15",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm mb-2 font-semibold">
                  {field.label}
                </label>

                <input
                  name={field.name}
                  type="number"
                  value={form[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="w-full bg-white/20 px-4 py-3 rounded-xl outline-none placeholder:text-gray-200 transition hover:bg-white/30"
                />
              </div>
            ))}

            {/* Predict Button */}
            <button
              onClick={predict}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-lime-300 text-green-900 hover:bg-lime-400 transition shadow-lg hover:shadow-2xl"
            >
              {loading ? "Predicting..." : "Predict Risk"}
            </button>
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <div className="max-w-2xl mx-auto mt-10 animate-fade">

            <div
              className={`p-6 rounded-2xl shadow-xl text-white transition-all duration-300 ${
                result.risk === "High"
                  ? "bg-gradient-to-r from-red-600 to-red-500"
                  : result.risk === "Medium"
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-500"
                  : "bg-gradient-to-r from-green-600 to-green-500"
              }`}
            >
              <h2 className="text-2xl font-bold">
                Prediction Result
              </h2>

              <div className="mt-4">
                <span className="font-semibold">Risk Level:</span>

                <span className="ml-3 px-4 py-1 rounded-full bg-white/20 font-bold">
                  {result.risk}
                </span>
              </div>

              <p className="mt-4 opacity-90">
                {result.reason}
              </p>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
}
