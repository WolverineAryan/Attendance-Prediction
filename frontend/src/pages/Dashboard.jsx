import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import KpiCards from "../components/KpiCards.jsx";
import { DataContext } from "../context/DataContext.jsx";
import CSVCharts from "../components/CSVCharts.jsx";
import ChatPopup from "../components/ChatPopup.jsx";
import { exportDashboardAsZip } from "../utils/exportDashboardZip.js";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(csvData.length / pageSize);

  // PAGINATED DATA ONLY FOR TABLES
  const safeData = Array.isArray(csvData)
    ? csvData.slice((page - 1) * pageSize, page * pageSize)
    : [];

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Layout>
      <div style={{ padding: 20 }}>

        <h1 style={{ marginBottom: 20 }}>Dashboard</h1>

        {/* 
          🔥 KPI CARDS MUST USE FULL DATASET
          NOT PAGINATED DATA 
        */}
        <KpiCards data={csvData} />

        {/* CHARTS ALSO SHOULD USE FULL DATA */}
        <CSVCharts data={csvData} />

        <button
          onClick={exportDashboardAsZip}
          className="px-6 py-3 mb-6 rounded-xl font-bold bg-green-700 text-white hover:bg-green-800 transition"
        >
          📄 Export Charts as PDF
        </button>

        {/* PAGINATION ONLY FOR TABULAR DISPLAY */}
        {csvData.length > pageSize && (
          <div
            style={{
              marginTop: 25,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <button onClick={prevPage} disabled={page === 1}>
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button onClick={nextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}

        {/* CHATBOT POPUP */}
        <button
          onClick={() => navigate("/chatpopup")}
          style={{
            position: "fixed",
            bottom: 25,
            right: 25,
            padding: 14,
            borderRadius: "50%",
            background: "#111827",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}
        >
          💬
        </button>

        <ChatPopup />

      </div>
    </Layout>
  );
}
