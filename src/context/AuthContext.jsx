// src/context/AuthContext.jsx
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
  const [token, setToken] = useState(() => {
    return localStorage.getItem("gh_token") || null;
  });

  // Set up axios interceptor to include token in all requests
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify user on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("gh_token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

    api
      .get("/auth/profile")
      .then((res) => {
        setUser(res.data);
        setFarm(null);
      })
      .catch((error) => {
        console.error("Auth verification failed:", error);
        localStorage.removeItem("gh_token");
        localStorage.removeItem("gh_user");
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { access_token, user } = res.data;

      localStorage.setItem("gh_token", access_token);
      localStorage.setItem("gh_user", JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setToken(access_token);
      setUser(user);

      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (payload) => {
    try {
      const res = await api.post("/auth/register", payload);

      const { user } = res.data;

      if (res.data.access_token) {
        localStorage.setItem("gh_token", res.data.access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
        setToken(res.data.access_token);
      }

      setUser(user);

      return res.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("gh_token");
    localStorage.removeItem("gh_user");
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setFarm(null);
    setToken(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("gh_user", JSON.stringify(updatedUser));
  };

  const updateFarm = (newFarm) => {
    setFarm(newFarm);
  };

  const value = {
    user,
    farm,
    loading,
    token,
    login,
    register,
    logout,
    updateUser,
    updateFarm,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;