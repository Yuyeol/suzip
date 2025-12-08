import { ReactNode, HTMLAttributes } from 'react';

type TitleVariant = 'title-1' | 'title-2' | 'title-3' | 'title-4';
type BodyVariant = 'body-1' | 'body-2' | 'body-3' | 'body-4';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: TitleVariant | BodyVariant;
  color?: 'normal' | 'primary' | 'danger' | 'light';
}

export default function Text({
  children,
  variant = 'body-2',
  color = 'normal',
  className = '',
  ...props
}: TextProps) {
  const variantStyles = {
    'title-1': 'text-2xl font-bold',
    'title-2': 'text-xl font-bold',
    'title-3': 'text-lg font-semibold',
    'title-4': 'text-base font-semibold',
    'body-1': 'text-base font-normal',
    'body-2': 'text-sm font-normal',
    'body-3': 'text-xs font-normal',
    'body-4': 'text-xs font-medium',
  };

  const colorStyles: Record<'normal' | 'primary' | 'danger' | 'light', string> = {
    normal: 'text-foreground',
    primary: 'text-primary',
    danger: 'text-danger',
    light: 'text-muted',
  };

  return (
    <span
      className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
