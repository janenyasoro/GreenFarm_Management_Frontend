import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  const initials = (user?.full_name || user?.email || "U")
    .split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <nav style={{
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      height: "64px",
      display: "flex",
      alignItems: "center",
      padding: "0 1.5rem",
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              backgroundColor: "#2C5F2D", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 600, flexShrink: 0,
            }}>
              {initials}
            </div>
            <span style={{ fontSize: "0.875rem", color: "#243325", fontWeight: 500 }}>
              {user?.full_name || user?.email || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.5rem 0.875rem", borderRadius: "6px",
              fontSize: "0.8125rem", fontWeight: 500,
              border: "1px solid #2C5F2D",
              color: "#2C5F2D", backgroundColor: "#ffffff",
              cursor: "pointer", transition: "background-color 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E7F0DD"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
