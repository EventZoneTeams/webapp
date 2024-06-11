import React, { useState } from "react";
import {
  MoreInfoFormSchemaType,
  MoreInfoFormSchema,
  MoreInfoFormDefaultValues,
  DonationFormSchemaType,
  DonationFormSchema,
  DonationFormDefaultValues,
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { DateTimePicker } from "@/components/ui/my-date-input";

export default function DonationForm() {
  const { nextStep, prevStep } = useStepper();
  const { setDonation } = useCreateEventStore();

  const form = useForm<DonationFormSchemaType>({
    resolver: zodResolver(DonationFormSchema),
    defaultValues: DonationFormDefaultValues,
  });

  const [totalCost, setTotalCost] = useState<number | string>(
    form.getValues("TotalCost") || 0
  );

  const onSubmit = (data: DonationFormSchemaType) => {
    setDonation(data);
    nextStep();
    console.log(data);
  };

  const DonationStartDate = useWatch({
    control: form.control,
    name: "DonationStartDate",
  });

  const DonationEndDate = useWatch({
    control: form.control,
    name: "DonationEndDate",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Donation</CardTitle>
            <CardDescription>
              Set up donation options for your event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="IsDonation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Donation (optional)
                    </FormLabel>
                    <FormDescription>
                      By enabling this option, you allow users to donate to your
                      event
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div
              className={cn(
                "space-y-8 p-4 border rounded-md transition-all duration-300 ease-in-out",
                form.watch("IsDonation") ? "block" : "hidden"
              )}
            >
              <FormField
                control={form.control}
                name="TotalCost"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Total Cost</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Total cost of the event"
                        {...field}
                        value={new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(totalCost))}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setTotalCost(value ? Number(value) : "");
                          field.onChange(value ? Number(value) : "");
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="DonationStartDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          jsDate={field.value}
                          onJsDateChange={field.onChange}
                          hourCycle={24}
                          granularity="minute"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="DonationEndDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          jsDate={field.value}
                          onJsDateChange={field.onChange}
                          hourCycle={24}
                          granularity="minute"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
