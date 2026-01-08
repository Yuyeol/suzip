'use client';

import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import Textarea from './textarea';
import React from 'react';

interface FormTextareaProps<T extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
}

export default function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...textareaProps
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Textarea
          label={label}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error}
          {...textareaProps}
        />
      )}
    />
  );
}
