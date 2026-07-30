import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, title, actions }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="container mx-auto px-4 py-8 flex-1">
                {title && (
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-harvest-900">{title}</h1>
                        {actions && <div className="flex items-center gap-3">{actions}</div>}
                    </div>
                )}

                <div>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;