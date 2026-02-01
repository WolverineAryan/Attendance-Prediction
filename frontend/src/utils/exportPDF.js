import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function exportPDF(data) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Attendance Prediction Report", 14, 20);

  // Date
  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    30
  );

  // Summary
  const total = data.length;
  const high = data.filter((d) => d.risk === "High").length;
  const medium = data.filter((d) => d.risk === "Medium").length;
  const low = data.filter((d) => d.risk === "Low").length;

  doc.text(`Total Students: ${total}`, 14, 40);
  doc.text(`High Risk: ${high}`, 14, 48);
  doc.text(`Medium Risk: ${medium}`, 14, 56);
  doc.text(`Low Risk: ${low}`, 14, 64);

  // Table
  autoTable(doc, {
    startY: 75,
    head: [[
      "ID",
      "Attendance",
      "Late",
      "Leaves",
      "Discipline",
      "Risk"
    ]],
    body: data.map((s) => [
      s.student_id,
      s.attendance,
      s.late,
      s.leaves,
      s.discipline,
      s.risk
    ]),
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [79, 70, 229]
    }
  });

  doc.save("attendance_prediction_report.pdf");
}
