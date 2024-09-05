"use client";

import {
  AddEventSchema,
  AddEventSchemaDefaultValue,
  AddEventSchemaType,
} from "@/app/(root)/dashboard/@admin/events/new/components/addEventSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/input/DatePicker";

export default function AddEventForm() {
  const form = useForm<AddEventSchemaType>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: AddEventSchemaDefaultValue,
  });

  const onSubmit = (data: AddEventSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event's title" {...field} />
              </FormControl>
              <FormDescription>Title of the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="eventStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event start date</FormLabel>
                  <FormControl>
                    <DatePicker />
                  </FormControl>
                  <FormDescription>Start date of the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="eventStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event end date</FormLabel>
                  <FormControl>
                    <DatePicker />
                  </FormControl>
                  <FormDescription>End date of the event</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
