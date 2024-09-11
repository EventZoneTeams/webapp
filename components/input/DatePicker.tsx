"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      showTime = false,
      minDate,
      maxDate,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const padZero = (num: number) => (num < 10 ? `0${num}` : num);

    const formatDate = (date: Date | string) => {
      if (typeof date === "string") {
        date = new Date(date);
      }

      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());

      const dateStr = `${year}-${month}-${day}`;

      if (showTime) {
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${dateStr}T${hours}:${minutes}`;
      }

      return dateStr;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: new Date(value).toISOString(),
          },
        });
      }
    };

    return (
      <input
        type={showTime ? "datetime-local" : "date"}
        className={cn(
          "w-full rounded border border-input bg-input-background p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        value={value ? formatDate(String(value)) : ""}
        min={minDate ? formatDate(minDate) : ""}
        max={maxDate ? formatDate(maxDate) : ""}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
