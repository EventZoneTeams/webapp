import {
  createEventOrder,
  CreateEventOrderSendData,
  getEventOrderByEventId,
  GetEventOrderByEventIdSendData,
  getEventOrderById,
  updateEventOrder,
  UpdateEventOrderSendData,
} from "@/api/event-order";
import { useEventOrderStore } from "@/stores/event-order";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export default function useEventOrder() {
  const { queryObj, setQueryObj, switchTrigger, trigger } =
    useEventOrderStore();

  const getEventOrderMutation = useMutation({
    mutationFn: (data: GetEventOrderByEventIdSendData) =>
      getEventOrderByEventId(data),
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

  useEffect(() => {
    getEventOrderMutation.mutate(queryObj);
  }, [queryObj, trigger]);

  const orders = useMemo(() => {
    return getEventOrderMutation.data?.data || [];
  }, [getEventOrderMutation.data]);

  return {
    orders,
    queryObj,
    trigger,
    setQueryObj,
    switchTrigger,
    getEventOrderMutation,
    getEventOrderByIdMutation,
    createEventOrderMutation,
    updateEventOrderMutation,
  };
}
