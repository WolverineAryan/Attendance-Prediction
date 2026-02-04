import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
