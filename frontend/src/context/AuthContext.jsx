import React, { createContext, useState } from "react";
import api from "../utils/axiosConfig";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async (data) => {
    await api.post("/signup", data);
  };

  const login = async (credentials) => {
    const res = await api.post("/login", credentials);

    localStorage.setItem("token", res.data.access_token);

    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
