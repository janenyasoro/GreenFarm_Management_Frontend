import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 flex items-center justify-between text-sm text-gray-600">
        <div>© {new Date().getFullYear()} GreenFarm</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
