import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'primary-light' | 'neutral' | 'danger' | 'danger-light' | 'muted' | 'muted-light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-medium';

  const variantStyles = {
    primary: 'bg-primary text-white',
    'primary-light': 'bg-primary-light text-white',
    neutral: 'bg-white text-black border border-border',
    danger: 'bg-danger text-white',
    'danger-light': 'bg-danger-light text-white',
    muted: 'bg-muted text-white',
    'muted-light': 'bg-muted-light text-white',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
