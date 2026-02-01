import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const exportDashboardAsZip = async () => {
  const zip = new JSZip();

  const charts = [
    { id: "attendance-chart", name: "attendance.png" },
    { id: "risk-pie-chart", name: "risk-pie.png" },
    { id: "late-leaves-chart", name: "late-vs-leaves.png" },
    { id: "discipline-chart", name: "discipline.png" },
  ];

  for (const chart of charts) {
    const element = document.getElementById(chart.id);

    if (!element) continue;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const image = canvas.toDataURL("image/png");
    const base64 = image.split(",")[1];

    zip.file(chart.name, base64, { base64: true });
  }

  const content = await zip.generateAsync({ type: "blob" });

  saveAs(content, "dashboard-images.zip");
};
