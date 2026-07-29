import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/crops", label: "Crops" },
  { to: "/livestock", label: "Livestock" },
  { to: "/expenses", label: "Expenses" },
  { to: "/income", label: "Income" },
  { to: "/inventory", label: "Inventory" },
  { to: "/tasks", label: "Tasks" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-harvest-800 text-harvest-50 min-h-screen p-5 hidden md:flex md:flex-col">
      <div className="mb-10">
        <h1 className="font-display text-2xl font-semibold text-white">GreenHarvest</h1>
        <p className="text-xs text-harvest-200 mt-1">Farm Management</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-harvest-600 text-white"
                  : "text-harvest-100 hover:bg-harvest-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <p className="text-xs text-harvest-300 mt-6">© {new Date().getFullYear()} GreenHarvest</p>
    </aside>
  );
}
