import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { LuCalendar } from "react-icons/lu";

interface CalendarPicker {
  field: ControllerRenderProps<FieldValues, string>;
}
const CalendarPicker = ({ field }: CalendarPicker) => {
  const [date, setDate] = useState<Date | undefined>(field.value);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    field.onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "mt-1 w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <LuCalendar className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          pagedNavigation
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPicker;
