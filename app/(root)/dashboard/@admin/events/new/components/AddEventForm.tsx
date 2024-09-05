"use client";

import {
  AddEventSchema,
  AddEventSchemaDefaultValue,
  AddEventSchemaType,
} from "@/app/(root)/dashboard/@admin/events/new/components/addEventSchema";
import { DatePicker } from "@/components/input/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
          <FormField
            control={form.control}
            name="eventStartDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Event start date</FormLabel>
                <FormControl>
                  <DatePicker
                    showTime
                    value={String(field.value)}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Start date of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventStartDate"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Event end date</FormLabel>
                <FormControl>
                  <DatePicker
                    showTime
                    value={String(field.value)}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>End date of the event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* <AddressInput
            onChange={setAddress}
            defaultAddress={defaultPosition}
          /> */}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
