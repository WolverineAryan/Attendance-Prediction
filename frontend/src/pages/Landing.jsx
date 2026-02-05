import React, { useContext, useState } from "react";
import Layout from "../components/Layout.jsx";
import KpiCards from "../components/KpiCards.jsx";
import CsvCharts from "../components/CSVCharts.jsx";
import { DataContext } from "../context/DataContext.jsx";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  const [page, setPage] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(csvData.length / pageSize);

  const safeData = Array.isArray(csvData)
    ? csvData.slice((page - 1) * pageSize, page * pageSize)
    : [];

  return (
    <Layout>
      <div style={{ padding: 20 }}>

        <h1>Dashboard</h1>

        {/* KPI CARDS */}
        <KpiCards data={safeData} />

        {/* RE-USE OLD CHARTS WITH PAGINATED DATA */}
        {safeData.length > 0 && (
          <CsvCharts data={safeData} />
        )}

        {/* Pagination */}
        {csvData.length > pageSize && (
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </Layout>
  );
}
