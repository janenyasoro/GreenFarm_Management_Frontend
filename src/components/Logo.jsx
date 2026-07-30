import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ compact = false }) => {
  return (
    <Link to="/dashboard" className="flex items-center gap-3">
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shadow-sm rounded-full"
      >
        <circle cx="32" cy="32" r="30" fill="#63893a" />
        <path d="M20 36c6-8 10-12 18-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 40c4-3 8-4 12-2" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {!compact && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-wider text-harvest-900">GreenFarm</span>
          <span className="text-xs text-harvest-700">Farm management</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
