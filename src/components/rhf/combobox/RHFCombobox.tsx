import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import ComboboxOptions from "./ComboboxOptions";

interface ComboboxOption {
  value: string;
  label: string;
}

interface RHFComboboxProps {
  name: string;
  label?: string;
  options: ComboboxOption[];
  placeholder?: string;
  className?: string;
}

const RHFCombobox = ({
  name,
  label,
  options,
  placeholder = "Select an option...",
  className,
}: RHFComboboxProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name];
    return error && typeof error.message === "string"
      ? error.message
      : undefined;
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ComboboxOptions
            options={options}
            placeholder={placeholder}
            field={field}
            label={label}
          />
        )}
      />
      <p className="text-sm text-red-500">
        &nbsp;
        {getErrorMessage(name)}
      </p>
    </div>
  );
};

export default RHFCombobox;
