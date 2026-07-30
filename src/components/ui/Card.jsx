// Reusable card component with hover variant
import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div className={`${hover ? 'card-hover' : 'card'} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;