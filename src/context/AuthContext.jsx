import { createContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

function loadStoredUser() {
  const stored = localStorage.getItem("gh_user");

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem("gh_user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser());
  const [farm, setFarm] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("gh_token") || null);
  const [loading, setLoading] = useState(() => !!localStorage.getItem("gh_token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

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
      const { access_token, user } = res.data;

      localStorage.setItem("gh_token", access_token);
      localStorage.setItem("gh_user", JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setToken(access_token);
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

  const updateFarm = (newFarm) => setFarm(newFarm);

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
