import React, { useContext } from "react";
import { DataContext } from "../context/DataContext.jsx";

import Layout from "../components/Layout.jsx";
import KpiCards from "../components/KpiCards";
import CsvCharts from "../components/CSVCharts.jsx";
import { exportDashboardAsZip } from "../utils/exportDashboardZip.js";
import Chatbot from "../components/ChatBot.jsx";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 p-6 md:p-10">

        {/* HEADER SECTION */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-green-800 via-green-600 to-lime-500 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h1>

          <p className="text-green-700 text-lg">
            Real-time insights and AI-powered attendance predictions
          </p>
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-wrap gap-4 items-center mb-8">

          <button
            onClick={exportDashboardAsZip}
            className="px-6 py-3 bg-gradient-to-r from-green-700 to-lime-500 text-white rounded-xl shadow-lg font-semibold hover:scale-[1.02] transition-all"
          >
            📦 Export Dashboard (ZIP)
          </button>

          <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-medium shadow-sm">
            Records Loaded: {csvData.length}
          </div>

        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid gap-8">

          {/* KPI SECTION */}
          <section className="bg-white rounded-3xl shadow-xl p-6 border border-green-100">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Key Performance Indicators
            </h2>

            <KpiCards data={csvData} />
          </section>

          {/* CHARTS SECTION */}
          {csvData.length > 0 && (
            <section className="bg-white rounded-3xl shadow-xl p-6 border border-green-100">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Data Visualizations
              </h2>

              <div className="transition-all hover:scale-[1.01]">
                <CsvCharts data={csvData} />
              </div>
            </section>
          )}

          {/* AI CHATBOT SECTION */}
          <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 rounded-3xl shadow-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">
              AI Assistant – Andy 🤖
            </h2>

            <p className="text-sm text-green-100 mb-4">
              Ask questions about your uploaded attendance data
            </p>

            <Chatbot />
          </section>

        </div>
      </div>
    </Layout>
  );
}
