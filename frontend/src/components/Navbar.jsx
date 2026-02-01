export default function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ color: "#4f46e5" }}>AI Attendance Prediction</h2>

      <div>
        <span style={{ marginRight: 20 }}>Admin</span>
        <button
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
