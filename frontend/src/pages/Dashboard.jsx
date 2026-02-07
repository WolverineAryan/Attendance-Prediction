import React, { useContext, useState } from "react";
import Layout from "../components/Layout.jsx";
import KpiCards from "../components/KpiCards.jsx";
import { DataContext } from "../context/DataContext.jsx";
import CSVCharts from "../components/CSVCharts.jsx";
import ChatPopup from "../components/ChatPopup.jsx";
import ColumnMapper from "../components/ColumnMapper.jsx";
import { exportDashboardAsZip } from "../utils/exportDashboardZip.js";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  // State to hold user-mapped data
  const [mappedData, setMappedData] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(csvData.length / pageSize);

  // PAGINATED DATA ONLY FOR TABLES (not used for KPIs/Charts)
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

        {/* ===== AUTO COLUMN MAPPING STEP ===== */}
        {!mappedData ? (
          <ColumnMapper
            data={csvData}
            onMapComplete={(mapped) => setMappedData(mapped)}
          />
        ) : (
          <>
            {/* ===== KPIs USING MAPPED DATA ===== */}
            <KpiCards data={mappedData} />

            {/* ===== CHARTS USING MAPPED DATA ===== */}
            <CSVCharts data={mappedData} />

            <br />

            <button
              onClick={exportDashboardAsZip}
              className="px-6 py-3 mb-6 rounded-xl font-bold bg-green-700 text-white hover:bg-green-800 transition"
            >
              📄 Export Charts as PDF
            </button>
          </>
        )}

        {/* ===== CHATBOT POPUP ===== */}
        <ChatPopup />

      </div>
    </Layout>
  );
}
