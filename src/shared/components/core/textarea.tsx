import React from 'react';
import type { FieldError } from 'react-hook-form';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  const stateStyles = props.disabled
    ? 'border-border-light cursor-not-allowed'
    : error
    ? 'border-danger'
    : 'border-border-light';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <textarea
        className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder:text-muted outline-none resize-none ${stateStyles} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-danger">{error.message}</p>}
    </div>
  );
}
