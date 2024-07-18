import {
  createEvent,
  CreateEventSendData,
  getEvent,
  getEventById,
  GetEventSendData,
} from "@/api/event";
import { useEventStore } from "@/stores/event";
import { useFilterAndPaging } from "@/stores/manager/filter-paging";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function useEvent() {
  const { queryObj, reset, metaData, setQueryObj } = useFilterAndPaging();
  const { currentEvent, setCurrentEvent } = useEventStore();
  const router = useRouter();
  const eventsMutation = useMutation({
    mutationFn: (queryData: GetEventSendData) => getEvent(queryData),
    onSuccess: (data) => {
      useFilterAndPaging.setState((state) => ({
        ...state,
        metaData: {
          currentPage: data.CurrentPage,
          pageSize: data.PageSize,
          totalCount: data.TotalCount,
          totalPages: data.TotalPages,
        },
      }));
    },
  });

  const getEventByIdMutation = useMutation({
    mutationFn: (id: number) => getEventById(id),
  });

  const createEventMutation = useMutation({
    mutationFn: (data: CreateEventSendData) => createEvent(data),
    onSuccess: () => {
      reset();
      Swal.fire({
        icon: "success",
        title: "Successfully",
        text: "Event created successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#30a5e8",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/dashboard/my-events");
        }
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    },
  });

  return {
    currentEvent,
    setCurrentEvent,
    queryObj,
    reset,
    metaData,
    setQueryObj,
    eventsMutation,
    getEventByIdMutation,
    createEventMutation,
  };
}
