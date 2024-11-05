import { useFormContext, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

interface DateTimePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  name,
  label,
  placeholder,
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [time, setTime] = useState("12:00");

  const getErrorMessage = (name: string): string | undefined => {
    const error = errors[name];
    return error && typeof error.message === "string"
      ? error.message
      : undefined;
  };

  return (
    <div className="w-full space-y-1">
      {label && (
        <Label htmlFor={name} className="ml-1">
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
                disabled={disabled}
              >
                {field.value ? (
                  format(field.value, "PPP p")
                ) : (
                  <span>{placeholder || "Select date and time"}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 space-y-2">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (!date) return;
                  const [hours, minutes] = time.split(":");
                  const newDate = new Date(date);
                  newDate.setHours(Number(hours), Number(minutes));
                  field.onChange(newDate);
                }}
                initialFocus
              />
              <div className="p-2">
                <Label htmlFor="time" className="ml-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    const [hours, minutes] = e.target.value.split(":");
                    if (field.value) {
                      const newDate = new Date(field.value);
                      newDate.setHours(Number(hours), Number(minutes));
                      field.onChange(newDate);
                    }
                  }}
                  disabled={disabled}
                />
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      <p className="text-sm text-red-500">&nbsp; {getErrorMessage(name)}</p>
    </div>
  );
};

export default DateTimePicker;
