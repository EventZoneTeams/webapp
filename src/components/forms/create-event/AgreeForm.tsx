import React, { useEffect } from "react";
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
import { Spinner } from "@/components/Loading/spinner";
import useEvent from "@/hooks/useEvent";

export default function AgreeToTermAndCondition() {
  const { nextStep, prevStep, hasCompletedAllSteps } = useStepper();
  const {
    BasicInfo,
    MoreInfo,
    Donation,
    Thumbnail,
    TermAndCons,
    setTermAndCons,
    reset,
  } = useCreateEventStore();
  const { authUser } = useUserStore();
  const { createEventMutation } = useEvent();

  const form = useForm<TermAndConditionSchemaType>({
    resolver: zodResolver(TermAndConditionSchema),
    defaultValues: {
      ...TermAndConditionDefaultValues,
      ...TermAndCons,
    },
  });

  const onSubmit = (data: TermAndConditionSchemaType) => {
    if (authUser && data.Agree) {
      const sendData: CreateEventSendData = {
        name: BasicInfo.Name,
        description: MoreInfo.Description,
        "thumbnail-url": Thumbnail,
        "donation-start-date": Donation.IsDonation
          ? Donation.DonationStartDate
          : null,
        "donation-end-date": Donation.IsDonation
          ? Donation.DonationEndDate
          : null,
        "event-start-date": BasicInfo.EventStartDate,
        "event-end-date": BasicInfo.EventEndDate,
        note: MoreInfo.Note,
        location: BasicInfo.Location,
        "user-id": authUser.Id,
        "event-category-id": parseInt(BasicInfo.EventCategoryId),
        university: BasicInfo.University,
        status: "PENDING",
        "organization-status": "PREPARING",
        "is-donation": Donation.IsDonation,
        "total-cost": Donation.IsDonation ? Donation.TotalCost : null,
      };
      console.log(sendData);
      createEventMutation.mutate(sendData);
      if (createEventMutation.isSuccess) {
        reset();
        nextStep();
      }
    }
  };

  const agree = form.watch("Agree");

  useEffect(() => {
    if (agree) {
      setTermAndCons({ Agree: agree });
    }
  }, [agree]);

  return (
    <React.Fragment>
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
                {createEventMutation.isPending ? (
                  <div className="flex gap-2 items-center">
                    <Spinner
                      size="medium"
                      show={true}
                      className="text-primary-foreground"
                    />
                    <p>Creating event...</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    Finish
                    <ArrowRightToLine className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </React.Fragment>
  );
}
