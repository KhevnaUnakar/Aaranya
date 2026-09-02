import React, { createContext, useState, useCallback } from "react";
import { login as loginRequest } from "../api/adminApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("aaranya_admin_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError("");
    try {
      const { token, user: loggedInUser } = await loginRequest({ email, password });
      localStorage.setItem("aaranya_admin_token", token);
      localStorage.setItem("aaranya_admin_user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return true;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("aaranya_admin_token");
    localStorage.removeItem("aaranya_admin_user");
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
