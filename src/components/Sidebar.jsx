import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/livestock",  label: "Livestock"  },
  { to: "/expenses",   label: "Expenses"   },
  { to: "/income",     label: "Income"     },
  { to: "/inventory",  label: "Inventory"  },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: "240px",
      flexShrink: 0,
      backgroundColor: "#f7f9f6",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem 0",
      height: "100%",
    }}>
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: "block",
              padding: "0.875rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: isActive ? "#2C5F2D" : "#243325",
              backgroundColor: isActive ? "#E7F0DD" : "transparent",
              textDecoration: "none",
              transition: "background-color 0.15s, color 0.15s",
              borderLeft: isActive ? "3px solid #2C5F2D" : "3px solid transparent",
              paddingLeft: "calc(1rem - 3px)",
            })}
            onMouseEnter={e => {
              if (!e.currentTarget.style.backgroundColor.includes("E7F0DD")) {
                e.currentTarget.style.backgroundColor = "#f0f3ed";
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.style.backgroundColor.includes("E7F0DD")) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
