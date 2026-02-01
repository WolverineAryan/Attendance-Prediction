import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManualPredict from "./pages/ManualPredict";
import UploadCSV from "./pages/UploadCSV";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manual" element={<ManualPredict />} />
        <Route path="/upload" element={<UploadCSV />} />
      </Routes>
    </BrowserRouter>
  );
}
