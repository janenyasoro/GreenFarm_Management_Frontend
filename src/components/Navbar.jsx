import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-harvest-100 px-6 py-4">
      <h2 className="text-xl font-semibold text-harvest-800">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-harvest-700 hidden sm:inline">
          {user?.full_name} · <span className="capitalize">{user?.role}</span>
        </span>
        <button onClick={handleLogout} className="btn-secondary text-sm">
          Log out
        </button>
      </div>
    </header>
  );
}
