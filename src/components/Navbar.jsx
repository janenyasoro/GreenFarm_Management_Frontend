// src/components/Navbar.jsx
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import Button from "./ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = (user?.full_name || user?.email || 'U')
    .split(' ')
    .map(n => n[0])
    .slice(0,2)
    .join('')
    .toUpperCase();

  return (
    <nav className="bg-harvest-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Middle: Nav links (centered on md+) */}
          <div className="hidden md:flex md:justify-center md:flex-1">
            <div className="flex items-center space-x-6">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `px-3 py-1 rounded-md transition ${isActive ? 'bg-harvest-700/30 font-semibold' : 'hover:bg-harvest-700/20'}`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/livestock"
                className={({ isActive }) => `px-3 py-1 rounded-md transition ${isActive ? 'bg-harvest-700/30 font-semibold' : 'hover:bg-harvest-700/20'}`}
              >
                Livestock
              </NavLink>
              <NavLink
                to="/expenses"
                className={({ isActive }) => `px-3 py-1 rounded-md transition ${isActive ? 'bg-harvest-700/30 font-semibold' : 'hover:bg-harvest-700/20'}`}
              >
                Expenses
              </NavLink>
              <NavLink
                to="/income"
                className={({ isActive }) => `px-3 py-1 rounded-md transition ${isActive ? 'bg-harvest-700/30 font-semibold' : 'hover:bg-harvest-700/20'}`}
              >
                Income
              </NavLink>
              <NavLink
                to="/inventory"
                className={({ isActive }) => `px-3 py-1 rounded-md transition ${isActive ? 'bg-harvest-700/30 font-semibold' : 'hover:bg-harvest-700/20'}`}
              >
                Inventory
              </NavLink>
            </div>
          </div>

          {/* Right: user info */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm">👋 {user?.full_name || user?.email || 'User'}</span>
              <div className="w-8 h-8 rounded-full bg-soil-900 flex items-center justify-center text-white text-sm font-semibold">
                {initials}
              </div>
            </div>

            <div className="hidden sm:block">
              <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-harvest-700/20"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-harvest-700/10">Dashboard</Link>
              <Link to="/livestock" className="px-3 py-2 rounded-md hover:bg-harvest-700/10">Livestock</Link>
              <Link to="/expenses" className="px-3 py-2 rounded-md hover:bg-harvest-700/10">Expenses</Link>
              <Link to="/income" className="px-3 py-2 rounded-md hover:bg-harvest-700/10">Income</Link>
              <Link to="/inventory" className="px-3 py-2 rounded-md hover:bg-harvest-700/10">Inventory</Link>
              <div className="pt-2 border-t border-harvest-700/30 mt-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-soil-900 flex items-center justify-center text-white text-sm font-semibold">{initials}</div>
                    <div className="text-sm">{user?.full_name || user?.email}</div>
                  </div>
                  <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;