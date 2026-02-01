import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ THIS WAS MISSING
  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setUser({ role: "admin" });
    } else {
      setUser({ role: "user" });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,   // ✅ VERY IMPORTANT
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
