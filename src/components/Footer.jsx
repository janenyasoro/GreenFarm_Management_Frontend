import React from 'react';

const Footer = () => (
  <footer style={{ borderTop: "1px solid #e5e7eb", marginTop: "auto" }}>
    <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", fontSize: "0.75rem", color: "#5B6B58" }}>
      <span>© {new Date().getFullYear()} GreenHarvest Farm Management</span>
      <div style={{ display: "flex", gap: "1.25rem" }}>
        <a href="#" style={{ color: "#5B6B58" }}>Privacy</a>
        <a href="#" style={{ color: "#5B6B58" }}>Terms</a>
        <a href="#" style={{ color: "#5B6B58" }}>Help</a>
      </div>
    </div>
  </footer>
);

export default Footer;
