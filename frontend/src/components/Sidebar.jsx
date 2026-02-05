import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UploadCloud, Edit3, Menu } from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manual", path: "/manual", icon: <Edit3 size={20} /> },
    { name: "CSV Upload", path: "/upload", icon: <UploadCloud size={20} /> },
  ];

  return (
    <div
  className={`fixed top-0 left-0 h-screen overflow-y-auto bg-gradient-to-b from-green-900 via-emerald-800 to-green-900 text-white transition-all duration-300 shadow-2xl ${
    collapsed ? "w-[80px]" : "w-[240px]"
  }`}
>
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-6">
        {!collapsed && (
          <h2 className="text-xl font-bold tracking-wide">
            🎓 APS
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Menu />
        </button>
      </div>

      {/* MENU ITEMS */}
      <div className="px-3">
        {menu.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center gap-3 px-4 py-3 mb-2 rounded-xl
                transition-all duration-300
                ${
                  active
                    ? "bg-lime-400 text-green-900 font-semibold shadow-lg"
                    : "hover:bg-white/10"
                }
              `}
            >
              <span className="group-hover:scale-110 transition-transform">
                {item.icon}
              </span>

              {!collapsed && (
                <span className="tracking-wide">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* FOOTER TEXT */}
      {!collapsed && (
        <div className="absolute bottom-5 left-5 text-xs opacity-60">
          AI Attendance System
        </div>
      )}
    </div>
  );
}
