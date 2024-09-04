"use client";

import { DatePicker } from "@/components/input/DatePicker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface BaseProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  desc?: string;
  className?: string;
}

interface DateProps {
  type: "date";
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
  defaultValue?: Date;
}

interface TextInputProps {
  type: "text" | "password" | "email" | "number";
  defaultValue?: string;
}

type CustomFormFieldProps<T extends FieldValues> = BaseProps<T> &
  (TextInputProps | DateProps);

function RenderInput<T extends FieldValues>({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps<T>;
}) {
  switch (props.type) {
    case "text":
    case "password":
    case "email":
    case "number":
      return (
        <Input
          placeholder={props.placeholder}
          value={field.value || ""}
          onChange={field.onChange}
          className={cn(props.className)}
          {...props}
        />
      );
    case "date":
      return (
        <DatePicker
          showTime={props.showTime}
          minDate={props.minDate}
          maxDate={props.maxDate}
          value={field.value}
          onChange={field.onChange}
        />
      );
    default:
      return null;
  }
}

export default function CustomFormField<T extends FieldValues>(
  props: CustomFormFieldProps<T>,
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <RenderInput field={field} props={props} />
          </FormControl>
          {props.desc && <FormDescription>{props.desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
