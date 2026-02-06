import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Particles from "../components/Particles";
import AnimatedBackground from "../components/AnimatedBackground";
import { useEffect } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const res = await signup({ name, email, password });

      // If backend returns tokens after signup
      if (res?.access_token) {
        localStorage.setItem("access_token", res.access_token);
      }

      if (res?.refresh_token) {
        localStorage.setItem("refresh_token", res.refresh_token);
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#f3f4f6] overflow-hidden">
      <Particles />

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-6xl w-full px-8">
        <div className="group bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 p-10 rounded-3xl shadow-2xl text-white backdrop-blur-lg">

          <h2 className="text-4xl font-bold text-center mb-8 tracking-wider">
            SIGN UP
          </h2>

          <div className="space-y-6">

            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="flex items-center bg-white/20 rounded-xl px-4 py-3">
              <User className="text-white mr-3" />
              <input
                className="bg-transparent outline-none w-full placeholder:text-gray-200"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-white/20 rounded-xl px-4 py-3">
              <Mail className="text-white mr-3" />
              <input
                className="bg-transparent outline-none w-full placeholder:text-gray-200"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-white/20 rounded-xl px-4 py-3">
              <Lock className="text-white mr-3" />
              <input
                type="password"
                className="bg-transparent outline-none w-full placeholder:text-gray-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-white/20 rounded-xl px-4 py-3">
              <Lock className="text-white mr-3" />
              <input
                type="password"
                className="bg-transparent outline-none w-full placeholder:text-gray-200"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold bg-lime-300 text-green-900 hover:bg-lime-400 transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-bold cursor-pointer hover:underline text-lime-300"
              >
                Login
              </span>
            </p>

          </div>
        </div>

        <div className="space-y-6 text-right">
          <h1 className="text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-green-900 via-green-600 to-lime-500 bg-clip-text text-transparent">
              AI Attendance Prediction System
            </span>
          </h1>

          <p className="text-green-800 text-lg">
            Create your account to start smart attendance analysis
          </p>
        </div>
      </div>
    </div>
  );
}
