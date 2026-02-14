import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for classes (since we aren't using tailwind but have these utilities)
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    return (
        <button
            className={cn('btn', variantClass, className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
