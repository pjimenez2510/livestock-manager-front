import { useFormContext, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import CalendarPicker from "./CalendarPicker";

interface RHFDatePickerProps {
  name: string;
  label: string;
}

const RHFDatePicker: React.FC<RHFDatePickerProps> = ({ name, label }) => {
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
    <div className="w-full">
      <Label htmlFor={name} className="mb-1 ml-1 ">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <CalendarPicker field={field} />
            <p className="mt-1 max-w-52 text-sm text-red-500">
              &nbsp; {getErrorMessage(name)}
            </p>
          </>
        )}
      />
    </div>
  );
};

export default RHFDatePicker;
