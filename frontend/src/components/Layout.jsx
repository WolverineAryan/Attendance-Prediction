import React from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
  <Sidebar />

  <div className="ml-[240px]" style={{ flex: 1, padding: 30 }}>
    <Navbar />
    {children}
  </div>
</div>
  );
}