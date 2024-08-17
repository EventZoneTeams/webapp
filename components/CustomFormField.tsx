import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control } from "react-hook-form";

interface CustomFormFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  type: "text" | "password" | "email" | "number" | "date";
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RenderInput({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) {
  switch (props.type) {
    case "text":
      return <Input placeholder={props.placeholder} {...field} />;
    case "password":
      return (
        <Input type="password" placeholder={props.placeholder} {...field} />
      );
    default:
      return null;
  }
}

export default function CustomFormField(props: CustomFormFieldProps) {
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
