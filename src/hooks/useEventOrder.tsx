import { getEventOrder } from "@/api/event-order";
import { useMutation } from "@tanstack/react-query";

export default function useEventOrder() {
  const getEventOrderMutation = useMutation({
    mutationFn: (eventId: number) => getEventOrder(eventId),
  });

  return {
    getEventOrderMutation,
  };
}
