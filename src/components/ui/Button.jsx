import React from 'react';

export default function Button({ children, className = '', variant = 'primary', onClick, as = 'button', ...props }) {
  const Comp = as;

  const base = "inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors";

  const styles = {
    primary:   { backgroundColor: "#2C5F2D", color: "#fff" },
    secondary: { border: "1px solid #2C5F2D", color: "#2C5F2D", backgroundColor: "transparent" },
    ghost:     { color: "#2C5F2D", backgroundColor: "transparent" },
  };

  const hoverClass = {
    primary:   "hover:opacity-90",
    secondary: "hover:bg-green-50",
    ghost:     "hover:bg-green-50",
  };

  return (
    <Comp
      onClick={onClick}
      className={`${base} ${hoverClass[variant] || hoverClass.primary} ${className}`}
      style={styles[variant] || styles.primary}
      {...props}
    >
      {children}
    </Comp>
  );
}
