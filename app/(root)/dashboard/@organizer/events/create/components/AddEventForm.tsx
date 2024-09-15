"use client";

import {
  AddEventSchema,
  AddEventSchemaDefaultValue,
  AddEventSchemaType,
} from "@/app/(root)/dashboard/@organizer/events/create/components/addEventSchema";
import AddressInput from "@/components/input/AddressInput";
import { DatePicker } from "@/components/input/DatePicker";
import { ImageCropper } from "@/components/input/ImageInput";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@/lib/api/event";
import { EventCategory } from "@/lib/api/event-category";
import { Image } from "@/lib/api/image";
import { CreateEventRequest } from "@/types/api/event";
import { EventCategory as EventCategoryType } from "@/types/event-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Content } from "@tiptap/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddEventForm() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [eventCategories, setEventCategories] = useState<EventCategoryType[]>(
    [],
  );

  const form = useForm<AddEventSchemaType>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: AddEventSchemaDefaultValue,
  });

  const onSubmit = async (data: AddEventSchemaType) => {
    console.log(data);
    setIsLoading(true);

    try {
      if (image) {
        const imageUrl = await Image.uploadImage(image);
        const payload: CreateEventRequest = {
          name: data.name,
          description: data.description as string,
          thumbnailUrl: imageUrl,
          eventStartDate: data.eventStartDate,
          eventEndDate: data.eventEndDate,
          location: {
            latitude: "0",
            longitude: "0",
            display: data.location?.description!,
            note: "",
            placeId: data.location?.place_id!,
          },
          note: "",
          eventCategoryId: data.eventCategoryId,
        };
        console.log(payload);

        Event.create(payload).then((response) => {
          router.push("/dashboard/events");
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    EventCategory.getEventCategories().then((response) => {
      if (response.isSuccess && response.data) {
        setEventCategories(response.data);
      }
    });
  }, []);

  return (
    <>
      <div>
        {!form.formState.isValid && form.formState.isSubmitted && (
          <ul className="mb-4 list-decimal rounded border border-red-500 bg-red-100 px-8 py-4 text-red-500">
            {Object.values(form.formState.errors).map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-8">
            <div className="w-1/2">
              <ImageCropper
                ratio="1:1"
                setFinalImage={setImage}
                className="rounded-xl bg-background/50 outline-none"
              />
            </div>
            <div className="w-1/2 space-y-8 rounded-xl bg-background/50 p-4">
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
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventEndDate"
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
                          minDate={
                            form.getValues("eventStartDate") as Date | undefined
                          }
                        />
                      </FormControl>
                      <FormDescription>End date of the event</FormDescription>
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
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <AddressInput
                        onSelected={(prediction) => {
                          if (prediction) {
                            field.onChange(prediction);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Location of the event (auto-complete)
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    value={field.value as Content}
                    onChange={field.onChange}
                    throttleDelay={2000}
                    className="w-full rounded-xl border-none bg-background/50 shadow-sm outline-none"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Type your description here..."
                    autofocus={true}
                    immediatelyRender={true}
                    editable={true}
                    injectCSS={true}
                    editorClassName="focus:outline-none "
                  />
                </FormControl>
                <FormDescription>Description of the event</FormDescription>
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-end gap-4">
            <Button type="submit" disabled={false} className="">
              {isLoading ? "Loading..." : "Create Event"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
