// Reusable card component with hover variant

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div className={`${hover ? 'card-hover' : 'card'} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;