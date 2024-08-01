import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showTime?: boolean;
}

const DatePicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, showTime = false, ...props }, ref) => {
    return showTime ? (
      <input
        type="datetime-local"
        className={cn(
          "bg-input-background border-input focus-visible:ring-ring w-full rounded-md border p-2 focus-visible:outline-none focus-visible:ring-2",
        )}
      />
    ) : (
      <input
        type="date"
        className={cn(
          "bg-input-background border-input focus-visible:ring-ring w-full rounded-md border p-2 focus-visible:outline-none focus-visible:ring-2",
        )}
      />
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
