import {
  BasicInfoDefaultValues,
  BasicInfoSchemaType,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ArrowRightToLine } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateEventStore } from "@/stores/createEvent";
import { useEffect } from "react";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";

export default function BasicInfoForm() {
  const { setEvent } = useCreateEventStore();
  const form = useForm<BasicInfoSchemaType>({
    defaultValues: BasicInfoDefaultValues,
  });

  const onSubmit = (data: BasicInfoSchemaType) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(form.getValues());
    setEvent(form.getValues());
  }, [
    form.getValues().Name,
    form.getValues().EventStartDate,
    form.getValues().EventEndDate,
    form.getValues().Location,
    form.getValues().University,
    form.getValues().EventCategoryId,
  ]);

  form.watch(["Name"]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Event Basic Info</CardTitle>
            <CardDescription>
              Fill in the basic Info of the event
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="Name"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>
                        Event Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          {...field}
                          className="bg-secondary"
                          required
                        />
                      </FormControl>
                      <div className="w-full truncate">
                        {form.formState.errors.Name ? (
                          <FormMessage>
                            {form.formState.errors.Name.message}
                          </FormMessage>
                        ) : (
                          <FormDescription>
                            This is your public display name.
                          </FormDescription>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="EventStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="">
                          Start date <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <CustomDatePicker
                            field={field}
                            className="bg-secondary"
                            showTime={true}
                          />
                        </FormControl>
                        <div className="w-full truncate">
                          {form.formState.errors.EventStartDate ? (
                            <FormMessage>
                              {form.formState.errors.EventStartDate.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              Start date of the event.
                            </FormDescription>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="EventEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="">
                          End date <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <CustomDatePicker
                            field={field}
                            className="bg-secondary"
                            showTime={true}
                          />
                        </FormControl>
                        <div className="w-full truncate">
                          {form.formState.errors.EventEndDate ? (
                            <FormMessage>
                              {form.formState.errors.EventEndDate.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              End date of the event.
                            </FormDescription>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="EventCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary">
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="w-full truncate">
                        {form.formState.errors.EventCategoryId ? (
                          <FormMessage>
                            {form.formState.errors.EventCategoryId.message}
                          </FormMessage>
                        ) : (
                          <FormDescription>
                            Pick a category for your event.
                          </FormDescription>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <ImageUpload />
              </div>
            </div>
            <FormField
              control={form.control}
              name="Location"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>
                    Location <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="bg-secondaryt"
                      required
                    />
                  </FormControl>
                  <div className="w-full truncate">
                    {form.formState.errors.Location ? (
                      <FormMessage>
                        {form.formState.errors.Location.message}
                      </FormMessage>
                    ) : (
                      <FormDescription>
                        Fill in the location of the event.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="University"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>
                    University <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="bg-secondaryt"
                      required
                    />
                  </FormControl>
                  <div className="w-full truncate">
                    {form.formState.errors.University ? (
                      <FormMessage>
                        {form.formState.errors.University.message}
                      </FormMessage>
                    ) : (
                      <FormDescription>
                        Fill in the university of the event.
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className=" w-full"
              disabled={form.formState.isValid}
            >
              Next
              <ArrowRightToLine className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
