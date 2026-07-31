import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children, title, actions }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Top navbar */}
      <Navbar />

      {/* Main layout: sidebar + content */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
          <div style={{ padding: "2rem 1.5rem", flex: 1 }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              {title && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h1 style={{ margin: 0, fontSize: "1.375rem", fontWeight: 600, color: "#243325" }}>{title}</h1>
                  {actions && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem" }}>{actions}</div>}
                </div>
              )}
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
