import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext.jsx";
import {
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  Home,
  UploadCloud,
  Edit3,
  LayoutDashboard
} from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ======== ICON MAPPING FOR BREADCRUMBS ========
  const iconMap = {
    dashboard: <LayoutDashboard size={16} />,
    manual: <Edit3 size={16} />,
    upload: <UploadCloud size={16} />
  };

  // ======== FORMAT PAGE NAME ========
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // ======== DYNAMIC PAGE TITLE ========
  useEffect(() => {
    const path = location.pathname.split("/").filter(Boolean);
    const title = path.length
      ? `${formatName(path[path.length - 1])} | APS`
      : "Dashboard | APS";

    document.title = title;
  }, [location.pathname]);

  // ======== BREADCRUMB LOGIC ========
  const pathnames = location.pathname.split("/").filter((x) => x);

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 mb-6 shadow-sm flex justify-between items-center">

      {/* LEFT - Breadcrumbs */}
      <div className="flex items-center text-gray-600 text-sm gap-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-1 hover:text-green-700 transition"
        >
          <Home size={16} />
          Home
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <span key={to} className="flex items-center gap-2">
              <ChevronRight size={14} />

              <Link
                to={to}
                className="flex items-center gap-1 hover:text-green-700 transition capitalize"
              >
                {iconMap[value] || null}
                {formatName(value)}
              </Link>
            </span>
          );
        })}
      </div>

      {/* RIGHT - Actions */}
      <div className="flex items-center gap-4">

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          {theme === "light" ? (
            <>
              <Moon size={16} /> Dark
            </>
          ) : (
            <>
              <Sun size={16} /> Light
            </>
          )}
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
