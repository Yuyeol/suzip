"use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Input from "./input";
import Button from "./button";
import React from "react";

interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
  buttonProps?: {
    onClick: () => void;
    label: string;
    disabled?: boolean;
  };
}

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
  buttonProps,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {label}
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error}
                {...inputProps}
              />
            </div>
            {buttonProps && (
              <Button
                type="button"
                variant={buttonProps.disabled ? "primary-light" : "primary"}
                size="md"
                onClick={buttonProps.onClick}
                disabled={buttonProps.disabled}
              >
                {buttonProps.label}
              </Button>
            )}
          </div>
        </div>
      )}
    />
  );
}
