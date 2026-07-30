// Main navigation with role-based links and mobile responsiveness
import React, { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard, PawPrint, DollarSign, TrendingUp, Package,
  Users, Settings, LogOut, Menu, X, ChevronDown, UserCircle
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'owner';

  // Main navigation links - visible to all authenticated users
  const navLinks = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/livestock", icon: <PawPrint size={18} />, label: "Livestock" },
    { to: "/expenses", icon: <DollarSign size={18} />, label: "Expenses" },
    { to: "/income", icon: <TrendingUp size={18} />, label: "Income" },
    { to: "/inventory", icon: <Package size={18} />, label: "Inventory" },
  ];

  // Admin links - only visible to admin/owner roles
  const adminLinks = [
    { to: "/admin/users", icon: <Users size={18} />, label: "Users" },
    { to: "/admin/farms", icon: <Users size={18} />, label: "Farms" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-bold text-harvest-700">GreenFarm</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-harvest-50 text-harvest-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                {link.icon}{link.label}
              </NavLink>
            ))}

            {/* Admin dropdown links */}
            {isAdmin && adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`
                }
              >
                {link.icon}{link.label}
              </NavLink>
            ))}
          </div>

          {/* User menu - avatar with dropdown */}
          <div className="hidden md:flex items-center gap-3 relative">
            <span className="text-sm text-gray-600 hidden lg:inline">{user?.full_name}</span>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-harvest-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
                {user?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-100 py-2 w-48">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.full_name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-harvest-50 text-harvest-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}{link.label}
                </NavLink>
              ))}

              {isAdmin && adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}{link.label}
                </NavLink>
              ))}

              <div className="border-t border-gray-100 my-2" />

              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-800">{user?.full_name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;