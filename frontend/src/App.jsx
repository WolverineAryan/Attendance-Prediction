import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManualPredict from "./pages/ManualPredict.jsx";
import UploadCSV from "./pages/UploadCSV.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/manual" element={<ProtectedRoute><ManualPredict /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadCSV /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
