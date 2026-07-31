import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="#6E9B4E" />
        <path d="M20 36c6-8 10-12 18-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 40c4-3 8-4 12-2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#2C5F2D" }}>GreenHarvest</span>
        <span style={{ fontSize: "0.6875rem", color: "#5B6B58" }}>Farm Management</span>
      </div>
    </Link>
  );
};

export default Logo;
