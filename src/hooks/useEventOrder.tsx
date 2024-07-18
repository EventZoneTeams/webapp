import {
  createEventOrder,
  CreateEventOrderSendData,
  getEventOrderByEventId,
  getEventOrderById,
  getMyOrder,
  updateEventOrder,
  UpdateEventOrderSendData,
} from "@/api/event-order";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function useEventOrder() {
  const router = useRouter();

  const getEventOrderMutation = useMutation({
    mutationFn: (eventId: number) => getEventOrderByEventId(eventId),
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
          router.push("/orders");
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

  return {
    getEventOrderMutation,
    getEventOrderByIdMutation,
    createEventOrderMutation,
    updateEventOrderMutation,
    getMyOrderMutation,
  };
}
