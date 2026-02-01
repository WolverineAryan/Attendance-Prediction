const express = require("express");
const cors = require("cors");

const app = express(); // ✅ app is defined here
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Attendance backend running");
});

// prediction route
app.post("/predict", (req, res) => {
  const {
    attendance,
    late_days,
    leaves,
    discipline_score
  } = req.body;

  let risk = "";
  let reason = "";

  // risk level logic
  if (attendance >= 85) risk = "Safe";
  else if (attendance >= 70) risk = "Medium";
  else risk = "High";

  // risk reason logic
  if (attendance < 60)
    reason = "Very low attendance";
  else if (leaves > 10)
    reason = "Too many leaves";
  else if (late_days > 10)
    reason = "Frequent late arrivals";
  else if (discipline_score > 20)
    reason = "Poor discipline";
  else
    reason = "Normal attendance";

  res.json({
    risk_level: risk,
    risk_reason: reason
  });
}
);
const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// CSV upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "CSV uploaded successfully",
    filename: req.file.filename
  });
});

const csv = require("csv-parser");
const fs = require("fs");

app.post("/predict-csv", upload.single("file"), (req, res) => {
  const students = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const attendance = Number(row.Attendance_Percentage);
      const late = Number(row.Late_Days);
      const leaves = Number(row.Leaves);
      const discipline = Number(row.Discipline_Score);

      let risk = "Safe";
      let reason = "Normal attendance";

      if (attendance < 70) risk = "High";
      else if (attendance < 85) risk = "Medium";

      if (attendance < 60) reason = "Very low attendance";
      else if (leaves > 10) reason = "Too many leaves";
      else if (late > 10) reason = "Frequent late arrivals";
      else if (discipline > 20) reason = "Poor discipline";

      students.push({
        attendance,
        late,
        leaves,
        discipline,
        risk,
        reason
      });
    })
    .on("end", () => {
      res.json(students);
    });
    app.post("/download-csv", (req, res) => {
  const data = req.body;

  let csv = "Attendance,Late,Leaves,Discipline,Risk,Reason\n";

  data.forEach(row => {
    csv += `${row.attendance},${row.late},${row.leaves},${row.discipline},${row.risk},${row.reason}\n`;
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=attendance_prediction.csv");

  res.send(csv);
});

});

// start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
