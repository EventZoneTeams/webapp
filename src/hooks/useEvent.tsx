import {
  createEvent,
  CreateEventSendData,
  getEvent,
  getEventById,
  GetEventSendData,
} from "@/api/event";
import { useFilterAndPaging } from "@/stores/manager/filter-paging";
import { useMutation } from "@tanstack/react-query";

export default function useEvent() {
  const { queryObj, reset, metaData, setQueryObj } = useFilterAndPaging();
  const eventsMuation = useMutation({
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
      console.log("Event created successfully");
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    queryObj,
    reset,
    metaData,
    setQueryObj,
    eventsMuation,
    getEventByIdMutation,
    createEventMutation,
  };
}
