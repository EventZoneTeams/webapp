import React, { useState } from "react";
import {
  DonationFormSchemaType,
  DonationFormSchema,
  DonationFormDefaultValues,
  TermAndConditionSchema,
  TermAndConditionSchemaType,
  TermAndConditionDefaultValues,
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function AgreeToTermAndCondition() {
  const { nextStep, prevStep } = useStepper();

  const form = useForm<TermAndConditionSchemaType>({
    resolver: zodResolver(TermAndConditionSchema),
    defaultValues: TermAndConditionDefaultValues,
  });

  const onSubmit = (data: TermAndConditionSchemaType) => {
    console.log(data);
  };

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
            <FormField
              control={form.control}
              name="Agree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Agreement to the terms and conditions of the website
                    </FormLabel>
                    <FormDescription>
                      You can read the terms and conditions on the{" "}
                      <Link href="/examples/forms" className="text-blue-500">
                        terms and conditions
                      </Link>{" "}
                      page.
                    </FormDescription>
                  </div>
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
            <Button
              type="submit"
              className=" w-full"
              disabled={!form.formState.isValid}
            >
              Finish
              <ArrowRightToLine className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
