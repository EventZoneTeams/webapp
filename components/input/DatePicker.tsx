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
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={cn(
          "w-full rounded border border-input bg-input-background p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      />
    ) : (
      <input
        type="date"
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={cn(
          "w-full rounded border border-input bg-input-background p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      />
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
