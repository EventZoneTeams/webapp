"use client";

import {
  AddEventSchema,
  AddEventSchemaDefaultValue,
  AddEventSchemaType,
} from "@/app/(root)/dashboard/@admin/events/new/components/addEventSchema";
import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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

  console.log(form.getValues("eventStartDate"), form.getValues("eventEndDate"));
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          control={form.control}
          name="name"
          placeholder="Event's Title"
          type="text"
          label="Title"
          desc="Title of the event"
        />
        <div className="flex w-full items-center gap-6">
          <div className="w-1/2">
            <CustomFormField
              control={form.control}
              name="eventStartDate"
              placeholder="Event's Start date"
              type="date"
              label="Start Date"
              desc="Start date of the event"
              showTime
              minDate={new Date()}
            />
          </div>
          <div className="w-1/2">
            <CustomFormField
              control={form.control}
              name="eventEndDate"
              placeholder="Event's End date"
              type="date"
              label="End Date"
              desc="End date of the event"
              showTime
              minDate={new Date()}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
