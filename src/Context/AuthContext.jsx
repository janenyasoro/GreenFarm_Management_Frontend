import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("gh_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("gh_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
        setFarm(res.data.farm);
      })
      .catch(() => {
        localStorage.removeItem("gh_token");
        localStorage.removeItem("gh_user");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("gh_token", res.data.token);
    localStorage.setItem("gh_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  const register = async (payload) => {
    const res = await api.post("/auth/register", payload);
    localStorage.setItem("gh_token", res.data.token);
    localStorage.setItem("gh_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    setFarm(res.data.farm);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("gh_token");
    localStorage.removeItem("gh_user");
    setUser(null);
    setFarm(null);
  };

  return (
    <AuthContext.Provider value={{ user, farm, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
