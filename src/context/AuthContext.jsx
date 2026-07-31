// Authentication context - manages user session, login, register, and logout
import { createContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Load user from localStorage on initial render (persists across refreshes)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("gh_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [farm, setFarm] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("gh_token") || null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem("gh_token"));

  // Auto-set auth header when token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify token on app load - check if stored token is still valid
  useEffect(() => {
    const storedToken = localStorage.getItem("gh_token");
    if (!storedToken) {
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

    api
      .get("/auth/profile")
      .then((res) => {
        setUser(res.data);
        setFarm(null);
      })
      .catch(() => {
        // Token invalid - clear storage
        localStorage.removeItem("gh_token");
        localStorage.removeItem("gh_user");
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
      })
      .finally(() => setLoading(false));
  }, []);

  // Login function - authenticates user and stores token
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

  // Register function - creates new user account
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

  // Logout - clears all session data
  const logout = () => {
    localStorage.removeItem("gh_token");
    localStorage.removeItem("gh_user");
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setFarm(null);
    setToken(null);
  };

  // Update user in state and localStorage
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("gh_user", JSON.stringify(updatedUser));
  };

  const updateFarm = (newFarm) => setFarm(newFarm);

  // Context value - exposed to all consumers
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;