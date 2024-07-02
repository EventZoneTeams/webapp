import { addEventFeedBack, getEventFeedBack } from "@/api/feedback";
import { FeedbackSchemaType } from "@/schemas/feedbackSchema";
import { useTrigger } from "@/stores/trigger";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useFeedback() {
  const { trigger, switchTrigger } = useTrigger();
  const addFeedback = useMutation({
    mutationFn: (data: { eventId: number; data: FeedbackSchemaType }) =>
      addEventFeedBack(data.eventId, data.data),
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      switchTrigger();
    },
  });

  const getEventFeedBackMutation = useMutation({
    mutationFn: (eventId: number) => getEventFeedBack(eventId),
  });
  return {
    trigger,
    switchTrigger,
    addFeedback,
    getEventFeedBackMutation,
  };
}
