// Status badge with theme variants
import React from 'react';

const Badge = ({ children, variant = 'harvest', className = '', ...props }) => {
    const variants = {
        harvest: 'badge-harvest',
        amber: 'badge-amber',
        teal: 'badge-teal',
        gray: 'badge-gray',
        red: 'badge-red',
    };

    return (
        <span className={`${variants[variant] || variants.harvest} ${className}`} {...props}>
            {children}
        </span>
    );
};

export default Badge;