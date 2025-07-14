
import React from 'react';

interface TestButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export const TestButton: React.FC<TestButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const baseClasses = 'py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold';
    const variantClasses = variant === 'primary' 
        ? 'bg-[#0056b3] hover:bg-[#004494] text-white'
        : 'bg-[#e0e0e0] hover:bg-[#d0d0d0] text-gray-800';

    return (
        <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};
