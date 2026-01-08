import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", name, ...props }, ref) => {
    const baseStyles = "w-full px-4 py-2 border rounded-lg focus:outline-none";

    const stateStyles = props.disabled
      ? "border-border-light cursor-not-allowed"
      : error
      ? "border-danger"
      : "border-border-light";

    return (
      <label className="block text-sm font-medium text-foreground">
        {label && <span className="mb-1 block">{label}</span>}
        <input
          ref={ref}
          name={name}
          className={`${baseStyles} ${stateStyles} ${className}`}
          {...props}
        />
        {error?.message && (
          <p className="mt-1 text-sm text-danger">{error.message}</p>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
