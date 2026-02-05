import React, { useContext, useState } from "react";
import Layout from "../components/Layout.jsx";
import KpiCards from "../components/KpiCards.jsx";
import { DataContext } from "../context/DataContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import CSVCharts from "../components/CSVCharts.jsx";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  const [page, setPage] = useState(1);
  const pageSize = 100;

  const totalPages = Math.ceil(csvData.length / pageSize);

  const safeData = Array.isArray(csvData)
    ? csvData.slice((page - 1) * pageSize, page * pageSize)
    : [];

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Prepare minimal chart data
  const chartData = safeData.map((row, i) => ({
    name: row.student_id || `S${i + 1}`,
    attendance: Number(row.attendance || 0),
  }));

  return (
    <Layout>
      <div style={{ padding: 20 }}>

        <h1 style={{ marginBottom: 20 }}>Dashboard</h1>

        {/* KPI CARDS */}
        <KpiCards data={safeData} />
<CSVCharts data={safeData} />

        {/* PAGINATION */}
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

      </div>
    </Layout>
  );
}
