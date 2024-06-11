import React from "react";
import {
  TermAndConditionSchema,
  TermAndConditionSchemaType,
  TermAndConditionDefaultValues,
} from "@/schemas/createEventSchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateEventStore } from "@/stores/createEvent";
import { useStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { createEvent, CreateEventSendData } from "@/api/event";
import { useUserStore } from "@/stores/user";
import { useMutation } from "@tanstack/react-query";

export default function AgreeToTermAndCondition() {
  const { nextStep, prevStep } = useStepper();
  const { BasicInfo, MoreInfo, Donation, Thumbnail } = useCreateEventStore();
  const { authUser } = useUserStore();

  const form = useForm<TermAndConditionSchemaType>({
    resolver: zodResolver(TermAndConditionSchema),
    defaultValues: TermAndConditionDefaultValues,
  });

  const createEventMutation = useMutation({
    mutationFn: (data: CreateEventSendData) => createEvent(data),
    onSuccess: () => {
      console.log("Event created successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: TermAndConditionSchemaType) => {
    if (authUser && data.Agree) {
      const sendData: CreateEventSendData = {
        Name: BasicInfo.Name,
        Description: MoreInfo.Description,
        ThumbnailUrl: Thumbnail,
        DonationStartDate: Donation.DonationStartDate,
        DonationEndDate: Donation.DonationEndDate,
        EventStartDate: BasicInfo.EventStartDate,
        EventEndDate: BasicInfo.EventEndDate,
        Note: "ngo gia huan",
        Location: BasicInfo.Location,
        UserId: authUser?.id || 0,
        EventCategoryId: parseInt(BasicInfo.EventCategoryId),
        University: BasicInfo.University,
        Status: "PENDING",
        OriganizationStatus: "PREPARING",
        IsDonation: Donation.IsDonation,
        TotalCost: Donation.TotalCost || null,
      };
      console.log(sendData);
      createEventMutation.mutate(sendData);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Terms and conditions</CardTitle>
            <CardDescription>
              Please read the terms and conditions of the website before
              proceeding.
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
