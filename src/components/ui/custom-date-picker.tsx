"use client";

import * as React from "react";
import { addMonths, format } from "date-fns";
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
import { forwardRef, useCallback } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface CustomDatePickerProps {
  field?: ControllerRenderProps;
  className?: string;
  showTime?: boolean;
  min?: Date;
  max?: Date;
  defaultValues?: Date;
  [key: string]: any;
}

export const CustomDatePicker = forwardRef<
  HTMLInputElement,
  CustomDatePickerProps
>(
  (
    { field, className, showTime = false, min, max, defaultValues, ...prop },
    ref
  ) => {
    const initialDate = defaultValues ? new Date(defaultValues) : new Date();
    const [date, setDate] = React.useState<Date>(initialDate);
    const [hours, setHours] = React.useState<number>(initialDate.getHours());
    const [minutes, setMinutes] = React.useState<number>(
      initialDate.getMinutes()
    );

    const handleMonthChange = React.useCallback(
      (monthValue: string) => {
        const newDate = new Date(date);
        newDate.setMonth(parseInt(monthValue));
        setDate(newDate);
      },
      [date]
    );

    const handleYearChange = React.useCallback(
      (yearValue: string) => {
        const newDate = new Date(date);
        newDate.setFullYear(parseInt(yearValue));
        setDate(newDate);
      },
      [date]
    );

    const handleDateChange = React.useCallback(
      (selectedDate: Date) => {
        const newDate = new Date(selectedDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        setDate(newDate);
      },
      [hours, minutes]
    );

    const handleTimeChange = React.useCallback(() => {
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setDate(newDate);
    }, [date, hours, minutes]);

    React.useEffect(() => {
      handleTimeChange();
    }, [hours, minutes]);

    React.useEffect(() => {
      if (field) {
        field.onChange(date);
      }
    }, [date]);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start w-full",
              !date && "text-muted-foreground",
              className
            )}
          >
            {date ? (
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, showTime ? "PPP p" : "PPP")}
              </div>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2 bg-secondary">
          <div className="flex gap-2 items-center">
            <Select
              onValueChange={handleMonthChange}
              value={date.getMonth().toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Month" />
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
          {showTime && (
            <div className="flex gap-2 items-center">
              <Select
                onValueChange={(value) => setHours(parseInt(value))}
                value={hours.toString()}
              >
                <SelectTrigger>
                  <p>Hour:</p>
                  <SelectValue placeholder="Hours" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => setMinutes(parseInt(value))}
                value={minutes.toString()}
              >
                <SelectTrigger>
                  <p>Minute:</p>
                  <SelectValue placeholder="Minutes" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Array.from({ length: 60 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="rounded-md border">
            <Calendar
              mode="single"
              className="bg-background w-full rounded-md"
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
          <div>
            <Button
              onClick={() => {
                setDate(new Date());
              }}
              variant="outline"
              className="w-full"
            >
              Today
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
