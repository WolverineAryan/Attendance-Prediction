import React, { useState, useEffect } from "react";

export default function ColumnMapper({ data, onMapComplete }) {

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // ----- SMART COLUMN DETECTOR -----
  const autoDetect = (keywords) => {
    for (let col of columns) {
      const clean = col.toLowerCase().replace(/[%_ ]/g, "");

      for (let key of keywords) {
        if (clean.includes(key)) return col;
      }
    }
    return "";
  };

  const [mapping, setMapping] = useState({
    attendance: autoDetect(["attendance", "attend", "present", "percent"]),
    late: autoDetect(["late"]),
    leaves: autoDetect(["leave", "absent"]),
    risk: autoDetect(["risk", "prediction", "result"]),
    discipline: autoDetect(["discipline", "behavior", "score"])
  });

  useEffect(() => {
    // Re-run suggestions if new CSV is uploaded
    setMapping({
      attendance: autoDetect(["attendance", "attend", "present", "percent"]),
      late: autoDetect(["late"]),
      leaves: autoDetect(["leave", "absent"]),
      risk: autoDetect(["risk", "prediction", "result"]),
      discipline: autoDetect(["discipline", "behavior", "score"])
    });
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No CSV Data Available</div>;
  }

  const update = (key, value) => {
    setMapping(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyMapping = () => {
    const mappedData = data.map(row => ({
      attendance: row[mapping.attendance],
      late: row[mapping.late],
      leaves: row[mapping.leaves],
      risk: row[mapping.risk],
      discipline: row[mapping.discipline]
    }));

    onMapComplete(mappedData);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">
        Map Your CSV Columns (Auto Suggested)
      </h2>

      {Object.keys(mapping).map(key => (
        <div key={key} className="mb-4">
          <label className="block font-semibold mb-1 capitalize">
            {key} Column
          </label>

          <select
            className="border p-2 rounded w-full"
            value={mapping[key]}
            onChange={e => update(key, e.target.value)}
          >
            <option value="">-- Select Column --</option>

            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>

          {mapping[key] && (
            <div className="text-green-700 text-sm mt-1">
              ✓ Auto detected: {mapping[key]}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={applyMapping}
        className="px-6 py-2 bg-green-700 text-white rounded"
      >
        Apply Mapping
      </button>

    </div>
  );
}
