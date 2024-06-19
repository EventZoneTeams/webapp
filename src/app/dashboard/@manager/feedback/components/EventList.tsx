import React, { useEffect } from "react";
import { getEvent, GetEventSendData } from "@/api/event";
import { useMutation } from "@tanstack/react-query";
import NoEventFound from "@/app/dashboard/@manager/feedback/components/NoEventFound";
import EventsLoading from "@/app/dashboard/@manager/feedback/components/EventsLoading";
import EventCard from "@/components/EventCard";
import { useFilterAndPaging } from "@/stores/manager/filter-paging";
import Link from "next/link";

export default function EventList() {
  const { queryObj } = useFilterAndPaging();
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

  useEffect(() => {
    eventsMuation.mutate(queryObj);
  }, [queryObj]);
  return (
    <div className="w-full">
      {eventsMuation.isPending ? (
        <EventsLoading />
      ) : eventsMuation.data?.Data.length === 0 ? (
        <NoEventFound />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full p-10">
          {eventsMuation.data?.Data.map((event, index) => (
            <Link
              key={index}
              className=" flex items-center justify-center"
              href={`/dashboard/feedback/event/${event.Id}`}
            >
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
