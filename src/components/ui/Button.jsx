// Reusable button component with variants and icon support

const Button = ({
    children,
    variant = 'primary',   // primary, secondary, tertiary, outline, ghost, danger
    size = 'md',          // sm, md, lg
    className = '',
    onClick,
    disabled = false,
    type = 'button',
    icon: Icon,
    iconPosition = 'left'
}) => {
    const variants = {
        primary: 'bg-harvest-600 hover:bg-harvest-700 text-white',
        secondary: 'bg-amber-600 hover:bg-amber-700 text-white',
        tertiary: 'bg-teal-600 hover:bg-teal-700 text-white',
        outline: 'border-2 border-harvest-600 text-harvest-600 hover:bg-harvest-50',
        ghost: 'text-gray-600 hover:bg-gray-100',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`font-medium rounded-lg transition duration-200 flex items-center gap-2 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {Icon && iconPosition === 'left' && <Icon size={18} />}
            {children}
            {Icon && iconPosition === 'right' && <Icon size={18} />}
        </button>
    );
};

export default Button;