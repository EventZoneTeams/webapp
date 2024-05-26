"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  { placeholder: string; [key: string]: any }
>(({ placeholder, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        {...props}
        ref={ref}
        placeholder={placeholder}
      />
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsVisible((prev) => !prev);
        }}
        className={cn(
          "absolute top-1/2 right-0 transform -translate-y-1/2 w-20 rounded-l-none bg-muted"
        )}
      >
        {isVisible ? "Hide" : "Show"}
      </Button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
