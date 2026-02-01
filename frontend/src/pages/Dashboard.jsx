import { useContext } from "react";
import { DataContext } from "../context/DataContext";

import Layout from "../components/Layout";
import KpiCards from "../components/KpiCards";
import CsvCharts from "../components/CSVCharts";

export default function Dashboard() {
  const { csvData } = useContext(DataContext);

  return (
    <Layout>
      <KpiCards data={csvData} />

      <div className="card fade-in">
        <h3 style={{ marginBottom: 20 }}>
          Attendance Analytics
        </h3>

        <CsvCharts data={csvData} />
      </div>
    </Layout>
  );
}
