// Simple footer with copyright and attribution
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GreenFarm. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Made with <Heart size={14} className="text-red-500" /> for farmers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;