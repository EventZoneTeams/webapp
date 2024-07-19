import {
  createEventOrder,
  CreateEventOrderSendData,
  getEventOrderByEventId,
  GetEventOrderByEventIdSendData,
  getEventOrderById,
  getMyOrder,
  updateEventOrder,
  UpdateEventOrderSendData,
} from "@/api/event-order";
import { useEventOrderStore } from "@/stores/event-order";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useEffect, useMemo } from "react";

export default function useEventOrder() {
  const router = useRouter();

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
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Order created successfully!",
        text: "Would you like to pay for your order now?",
        confirmButtonText: "Yes, pay now",
        confirmButtonColor: "#30a5e8",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/profile/orders");
        }
      });
    },
  });

  const updateEventOrderMutation = useMutation({
    mutationFn: (data: UpdateEventOrderSendData) => updateEventOrder(data),
  });

  const getMyOrderMutation = useMutation({
    mutationFn: () => getMyOrder(),
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
    getMyOrderMutation,
  };
}
