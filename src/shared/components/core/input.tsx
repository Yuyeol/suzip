import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none';

    const stateStyles = props.disabled
      ? 'border-border-light cursor-not-allowed'
      : error
      ? 'border-danger'
      : 'border-border-light';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${stateStyles} ${className}`}
          {...props}
        />
        {error?.message && <p className="mt-1 text-sm text-danger">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
