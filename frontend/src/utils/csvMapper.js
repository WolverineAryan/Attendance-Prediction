// Smart column finder
export function findColumn(row, keywords) {
  if (!row) return null;

  const keys = Object.keys(row);

  for (let key of keys) {
    const lower = key.toLowerCase().replace(/[%_ ]/g, "");

    for (let k of keywords) {
      if (lower.includes(k)) return key;
    }
  }

  return null;
}

// Generic attendance extractor
export function getAttendance(row) {
  const col = findColumn(row, ["attendance", "attend", "present", "dayspresent"]);

  if (!col) return 0;

  return Number(String(row[col]).replace(/[% ,]/g, "")) || 0;
}

// Generic late days extractor
export function getLate(row) {
  const col = findColumn(row, ["late"]);

  if (!col) return 0;

  return Number(String(row[col]).replace(/[% ,]/g, "")) || 0;
}

// Generic leaves extractor
export function getLeaves(row) {
  const col = findColumn(row, ["leave", "absent"]);

  if (!col) return 0;

  return Number(String(row[col]).replace(/[% ,]/g, "")) || 0;
}

// Generic risk extractor
export function getRisk(row) {
  const col = findColumn(row, ["risk"]);

  if (!col) return "";

  return String(row[col]).toLowerCase();
}
