import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex bg-apsLime">

      {/* LEFT TEXT SECTION */}
      <div className="w-1/2 flex flex-col justify-center px-20 space-y-6">

        <h2 className="text-4xl tracking-wider text-green-900 font-light">
          WELCOME BACK
        </h2>

        <h1 className="text-6xl font-extrabold text-green-900 leading-tight">
          AI Attendance <br />
          Prediction System
        </h1>

        <p className="text-lg text-green-900">
          Smart attendance analysis using Artificial Intelligence
        </p>

      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-1/2 flex items-center justify-center">

        <div className="w-[460px] p-10 rounded-3xl bg-green-900/20 backdrop-blur-md shadow-xl">

          <h2 className="text-4xl font-bold text-white text-center mb-8">
            LOGIN
          </h2>

          {/* EMAIL */}
          <div className="relative mb-5">
            <Mail className="absolute left-4 top-4 text-black" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-3 pl-12 pr-4 rounded-xl bg-apsYellow outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <Lock className="absolute left-4 top-4 text-black" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 pr-4 rounded-xl bg-apsYellow outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-apsLime font-bold hover:shadow-lg transition"
          >
            login Now
          </button>

          <hr className="my-6 border-white/30" />

          {/* GOOGLE LOGIN */}
          <button
            className="w-full py-3 rounded-xl bg-apsLime font-bold hover:shadow-lg transition"
          >
            Login with Google
          </button>

          <p className="text-center mt-4 text-sm text-black">
            Dont have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-apsYellow font-semibold cursor-pointer"
            >
              Signup
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
