"use client";

import * as React from "react";
import { addDays, addMonths, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months } from "@/enums/dateEnum";
import { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const CustomDatePicker = forwardRef<
  HTMLInputElement,
  { field?: ControllerRenderProps; [key: string]: any }
>(({ field, ...props }, ref) => {
  const [date, setDate] = React.useState<Date>(new Date());

  const handleMonthChange = (monthValue: string) => {
    const newDate = new Date(date);
    newDate.setMonth(parseInt(monthValue));
    setDate(newDate);
  };

  const handleYearChange = (yearValue: string) => {
    const newDate = new Date(date);
    newDate.setFullYear(parseInt(yearValue));
    setDate(newDate);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  React.useEffect(() => {
    console.log(date.toDateString());
    field?.onChange(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex gap-2 items-center">
          <Select
            onValueChange={handleMonthChange}
            value={date.getMonth().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Moth" />
            </SelectTrigger>
            <SelectContent position="popper">
              {months.map((month, index) => (
                <SelectItem key={index} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleYearChange}
            value={date.getFullYear().toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <SelectItem key={i} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            month={date}
            onNextMonth={() => {
              setDate(addMonths(date, 1));
            }}
            onPrevMonth={() => {
              setDate(addMonths(date, -1));
            }}
            onSelect={(day: Date | undefined) =>
              handleDateChange(day || new Date())
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  );
});
