import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { DataContext } from "../context/DataContext";

export default function Students() {
  const { csvData } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const filtered = csvData.filter((row) => {
    const matchSearch =
      row.student_id
        ?.toString()
        .includes(search);

    const matchRisk =
      riskFilter === "All"
        ? true
        : row.risk === riskFilter;

    return matchSearch && matchRisk;
  });

  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>
        Student Records
      </h1>

      {/* CONTROLS */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 25,
        }}
      >
        <input
          placeholder="🔍 Search Student ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={riskFilter}
          onChange={(e) =>
            setRiskFilter(e.target.value)
          }
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="card fade-in">
        <table>
          <thead>
            <tr>
              {csvData[0] &&
                Object.keys(csvData[0]).map(
                  (h) => <th key={h}>{h}</th>
                )}
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                {Object.entries(row).map(
                  ([k, v]) => (
                    <td key={k}>
                      {k === "risk" ? (
                        <span
                          className={`badge ${
                            v === "High"
                              ? "high"
                              : v === "Medium"
                              ? "medium"
                              : "low"
                          }`}
                        >
                          {v}
                        </span>
                      ) : (
                        v
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p style={{ marginTop: 20 }}>
            No records found.
          </p>
        )}
      </div>
    </Layout>
  );
}
