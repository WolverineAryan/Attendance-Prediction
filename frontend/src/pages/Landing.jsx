import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChartsPreview from "../components/ChartsPreview.jsx";

// ================= GLASSMORPHISM STAT CARD =================
function StatCard({ title, value }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;

    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(165,200,158,0.6)]">
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-apsGreen via-apsLime to-apsOlive">
        <div className="glass-card p-6 rounded-2xl text-center">
          <h3 className="text-4xl font-bold text-gray-900">{count}+</h3>
          <p className="mt-2 font-semibold text-gray-800">{title}</p>
        </div>
      </div>
    </div>
  );
}

// ================= HORIZONTAL STATS SECTION =================
function StatsSection() {
  return (
    <section className="py-5 charts-glass-bg">
      <h2 className="text-3xl font-bold text-center mb-10 text-apsOlive">
        System Impact
      </h2>

      <div className="flex flex-wrap justify-center gap-20 px-10">
        <StatCard title="Students Analyzed" value={2500} />
        <StatCard title="Prediction Accuracy %" value={94} />
        <StatCard title="Institutions" value={15} />
        <StatCard title="Dropout Reduction %" value={30} />
      </div>
    </section>
  );
}

// ================= MAIN LANDING PAGE =================
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">

      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6 animate-fadeIn shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900">
          APS PLATFORM
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-apsLime rounded-full font-semibold hover:shadow-lg transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-apsGreen text-white rounded-full font-semibold hover:shadow-lg transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-center px-10 hero-pattern py-16">

        <div className="lg:w-1/2 space-y-6 animate-slideDown">

          <h2 className="text-6xl font-extrabold text-gray-900">
            Smart Attendance  
            <span className="text-apsOlive"> Analytics</span>
          </h2>

          <p className="text-xl text-gray-700">
            AI-powered platform to analyze attendance trends, predict student performance and generate smart insights.
          </p>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-apsYellow rounded-full font-bold hover:scale-105 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-apsGreen text-white rounded-full font-bold hover:scale-105 transition"
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0 animate-float">
          <img
            src="/landing-illustration.png"
            alt="Analytics"
            className="w-[520px]"
          />
        </div>
      </section>

      <StatsSection />

      {/* CHARTS PREVIEW */}
      <ChartsPreview />

      {/* MODERN FEATURES */}
      <section className="py-20 bg-white px-10">
        <h3 className="text-4xl font-bold text-center mb-12">
          Powerful Features
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Manual Prediction",
              desc: "Predict student risk instantly using AI models."
            },
            {
              title: "CSV Upload",
              desc: "Bulk analyze attendance records with one click."
            },
            {
              title: "AI Insights",
              desc: "Smart classification using machine learning."
            },
            {
              title: "Visual Dashboard",
              desc: "Interactive analytics and charts."
            }
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 bg-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            >
              <h4 className="text-2xl font-bold mb-4 text-apsOlive">
                {f.title}
              </h4>
              <p className="text-gray-700">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center gradient-bg-alt">
        <h3 className="text-4xl font-bold mb-6">
          Ready to Transform Attendance?
        </h3>

        <p className="text-lg mb-6">
          Join the smartest attendance analytics platform today.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="px-10 py-4 bg-white rounded-full font-bold hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

      <footer className="py-6 text-center text-sm bg-apsGreen">
        © 2026 APS Attendance Prediction System
      </footer>

    </div>
  );
}
  