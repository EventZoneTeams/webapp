import {
  createEventOrder,
  CreateEventOrderSendData,
  getEventOrder,
  getEventOrderById,
  updateEventOrder,
  UpdateEventOrderSendData,
} from "@/api/event-order";
import { useMutation } from "@tanstack/react-query";

export default function useEventOrder() {
  const getEventOrderMutation = useMutation({
    mutationFn: (eventId: number) => getEventOrder(eventId),
  });

  const getEventOrderByIdMutation = useMutation({
    mutationFn: (eventOrderId: number) => getEventOrderById(eventOrderId),
  });

  const createEventOrderMutation = useMutation({
    mutationFn: (data: CreateEventOrderSendData) => createEventOrder(data),
  });

  const updateEventOrderMutation = useMutation({
    mutationFn: (data: UpdateEventOrderSendData) => updateEventOrder(data),
  });

  return {
    getEventOrderMutation,
    getEventOrderByIdMutation,
    createEventOrderMutation,
    updateEventOrderMutation,
  };
}
