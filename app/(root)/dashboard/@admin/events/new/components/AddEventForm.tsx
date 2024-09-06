"use client";

import {
  AddEventSchema,
  AddEventSchemaDefaultValue,
  AddEventSchemaType,
} from "@/app/(root)/dashboard/@admin/events/new/components/addEventSchema";
import { DatePicker } from "@/components/input/DatePicker";
import { ImageCropper } from "@/components/input/ImageInput";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventCategory as EventCategoryType } from "@/types/event-category";
import { EventCategory } from "@/lib/api/event-category";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Content } from "@tiptap/core";

export default function AddEventForm() {
  const [image, setImage] = useState<File | null>(null);
  const [value, setValue] = useState<Content>("");
  const [eventCategories, setEventCategories] = useState<EventCategoryType[]>(
    [],
  );

  const form = useForm<AddEventSchemaType>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: AddEventSchemaDefaultValue,
  });

  const onSubmit = (data: AddEventSchemaType) => {
    console.log(data);
  };

  useEffect(() => {
    EventCategory.getEventCategories().then((response) => {
      if (response.isSuccess && response.data) {
        setEventCategories(response.data);
      }
    });
  }, []);

  console.log(value);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-8">
          <div className="w-1/2">
            <ImageCropper ratio="1:1" setFinalImage={setImage} />
          </div>
          <div className="w-1/2 space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
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
                    <FormLabel>
                      Event start date <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Event end date <span className="text-red-500">*</span>
                    </FormLabel>
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
            <FormField
              control={form.control}
              name="eventCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <MinimalTiptapEditor
          value={value}
          onChange={setValue}
          throttleDelay={2000}
          className="w-full"
          editorContentClassName="p-5"
          output="html"
          placeholder="Type your description here..."
          autofocus={true}
          immediatelyRender={true}
          editable={true}
          injectCSS={true}
          editorClassName="focus:outline-none"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
