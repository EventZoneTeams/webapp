import {
  BasicInfoSchema,
  BasicInfoDefaultValues,
  BasicInfoSchemaType,
} from "@/schemas/createEventSchema";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateEventStore } from "@/stores/createEvent";
import { useStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEventCategories } from "@/api/event-categories";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightToLine } from "lucide-react";
import { useEffect } from "react";
import { DateTimePicker } from "@/components/ui/my-date-input";
import { DateValue } from "react-aria";

export default function BasicInfoForm() {
  const { nextStep } = useStepper();
  const { setEvent, BasicInfo } = useCreateEventStore();
  const form = useForm<BasicInfoSchemaType>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      ...BasicInfoDefaultValues,
      ...BasicInfo,
    },
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
  });

  const onSubmit = (data: BasicInfoSchemaType) => {
    console.log(data);
    setEvent(data);
    nextStep();
  };

  useEffect(() => {
    BasicInfo.Name !== "" && form.reset(BasicInfo);
  }, []);

  const eventStartDate = useWatch({
    control: form.control,
    name: "EventStartDate",
  });

  const eventEndDate = useWatch({
    control: form.control,
    name: "EventEndDate",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Event Basic Info</CardTitle>
            <CardDescription>
              Fill in the basic Info of the event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="Name"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="More than 3 characters"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="EventStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        jsDate={
                          BasicInfo.EventStartDate
                            ? new Date(BasicInfo.EventStartDate)
                            : new Date()
                        }
                        onJsDateChange={field.onChange}
                        hourCycle={12}
                        granularity="minute"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="EventEndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        jsDate={
                          BasicInfo.EventEndDate
                            ? new Date(BasicInfo.EventEndDate)
                            : new Date()
                        }
                        onJsDateChange={field.onChange}
                        hourCycle={12}
                        granularity="minute"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="EventCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={BasicInfo.EventCategoryId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for your event" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="space-y-4">
                      {data?.data?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                          className="relative"
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Location"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="More than 3 characters"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="University"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <Input
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
