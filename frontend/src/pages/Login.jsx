import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Particles from "../components/Particles";
import AnimatedBackground from "../components/AnimatedBackground";
import { useEffect } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import useParallax from "../hooks/useParallax";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ email });
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-[#f3f4f6] overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 30;
        const y = (e.clientY / window.innerHeight) * 30;
        document.documentElement.style.setProperty("--mx", `${x}px`);
        document.documentElement.style.setProperty("--my", `${y}px`);
      }}
    >
      {/* FULL SCREEN INTERACTIVE PARTICLES */}
      <Particles />

      {/* PARALLAX ABSTRACT BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] bg-green-300 opacity-30 rounded-full blur-3xl transition-all duration-300"
          style={{
            transform: "translate(var(--mx), var(--my))",
          }}
        ></div>

        <div
          className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-lime-300 opacity-30 rounded-full blur-3xl transition-all duration-300"
          style={{
            transform: "translate(calc(var(--mx) * -1), calc(var(--my) * -1))",
          }}
        ></div>

        <div
          className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-emerald-200 opacity-20 rounded-full blur-2xl transition-all duration-300"
          style={{
            transform: "translate(calc(var(--mx) * 0.5), calc(var(--my) * 0.5))",
          }}
        ></div>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-6xl w-full px-8">
        {/* LEFT SIDE TEXT */}
        <div className="space-y-6 animate-fade">
          <p className="tracking-widest text-3xl text-green-900">
            WELCOME BACK TO
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-green-900 via-green-600 to-lime-500 bg-clip-text text-transparent">
              AI Attendance <br />
              Prediction System
            </span>
          </h1>

          <p className="text-green-800 text-lg">
            Smart attendance analysis using Artificial Intelligence
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="group bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 p-10 rounded-3xl shadow-2xl text-white backdrop-blur-lg transition duration-300 hover:scale-[1.02] relative overflow-hidden">
          
          {/* Glow Hover Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition duration-300 bg-gradient-to-r from-lime-400 to-emerald-500 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-center mb-8 tracking-wider">
              LOGIN
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center bg-white/20 rounded-xl px-4 py-3 transition hover:bg-white/30">
                <Mail className="text-white mr-3" />
                <input
                  className="bg-transparent outline-none w-full placeholder:text-gray-200"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="flex items-center bg-white/20 rounded-xl px-4 py-3 transition hover:bg-white/30">
                <Lock className="text-white mr-3" />
                <input
                  type="password"
                  className="bg-transparent outline-none w-full placeholder:text-gray-200"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-xl font-bold bg-lime-300 text-green-900 hover:bg-lime-400 transition shadow-lg hover:shadow-2xl"
              >
                Login Now
              </button>

              <div className="border-t border-white/30 my-4"></div>

              {/* Google Login */}
              <button className="w-full py-3 rounded-xl font-bold bg-white text-green-900 hover:bg-gray-100 transition shadow-lg">
                Login with Google
              </button>

              <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="font-bold cursor-pointer hover:underline text-lime-300"
                >
                  Signup
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
