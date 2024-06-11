import React from "react";
import {
  MoreInfoFormSchemaType,
  MoreInfoFormSchema,
  MoreInfoFormDefaultValues,
} from "@/schemas/createEventSchema";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { ImageUpload } from "@/components/ImageUpload";
import { useCreateEventStore } from "@/stores/createEvent";
import { useStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEventCategories } from "@/api/event-categories";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

export default function MoreInfoForm() {
  const { nextStep, prevStep } = useStepper();
  const { setMoreInfo } = useCreateEventStore();
  const form = useForm<MoreInfoFormSchemaType>({
    resolver: zodResolver(MoreInfoFormSchema),
    defaultValues: MoreInfoFormDefaultValues,
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
  });

  const onSubmit = (data: MoreInfoFormSchemaType) => {
    console.log(data);
    setMoreInfo(data);
    nextStep();
  };

  // const watchFields = useWatch({
  //   control: form.control,
  //   name: [
  //     "Name",
  //     "EventStartDate",
  //     "EventEndDate",
  //     "Location",
  //     "University",
  //     "EventCategoryId",
  //   ],
  // });

  // useEffect(() => {
  //   setEvent(form.getValues());
  // }, [watchFields, setEvent]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>More Infomation</CardTitle>
            <CardDescription>
              Provide more information about your event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload />
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="More than 3 characters"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="gap-4">
            <Button
              type="button"
              className=" w-full"
              variant={"outline"}
              onClick={() => {
                prevStep();
              }}
            >
              <ArrowLeftToLine className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className=" w-full">
              Next
              <ArrowRightToLine className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
