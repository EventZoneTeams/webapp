import { cn } from "@/lib/utils";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Ban,
  Bold,
  CircleCheck,
  Italic,
  SendHorizonal,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FeedbackDefaultValues,
  FeedbackSchema,
  FeedbackSchemaType,
} from "@/schemas/feedbackSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import useFeedback from "@/hooks/useFeedback";

export default function FeedBackForm() {
  const { addFeedback } = useFeedback();
  const pathname = usePathname();
  const eventId = Number(pathname.split("/")[4]);
  const form = useForm<FeedbackSchemaType>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: FeedbackDefaultValues,
  });

  const onSubmit = (data: FeedbackSchemaType) => {
    addFeedback.mutate({ eventId, data });
  };

  return (
    <div className="flex flex-col gap-2 h-40">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Give your feedback here..."
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              className="flex-1 flex items-center gap-2 text-red-500"
              variant={"secondary"}
              onClick={() => {
                form.setValue("status", "REJECT");
                form.handleSubmit(onSubmit)();
              }}
            >
              <Ban />
              Reject
            </Button>
            <Button
              type="button"
              className="flex-1 flex items-center gap-2 text-green-500"
              variant={"secondary"}
              onClick={() => {
                form.setValue("status", "APPROVE");
                form.handleSubmit(onSubmit)();
              }}
            >
              <CircleCheck />
              Approve
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
