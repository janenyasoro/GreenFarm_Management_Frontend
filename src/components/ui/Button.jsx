import React from 'react';

const variants = {
  primary: 'bg-harvest-500 hover:bg-harvest-600 text-white',
  secondary: 'bg-clay-500 hover:bg-clay-600 text-white',
  ghost: 'bg-transparent hover:bg-harvest-50 text-harvest-700',
};

export default function Button({ children, className = '', variant = 'primary', onClick, as = 'button', ...props }) {
  const Comp = as;
  const variantClass = variants[variant] || variants.primary;
  return (
    <Comp
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-medium shadow-sm transition ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
