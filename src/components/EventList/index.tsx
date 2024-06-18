import React, { useEffect } from "react";
import { getEvent, GetEventSendData } from "@/api/event";
import { useMutation } from "@tanstack/react-query";
import EventCard from "@/app/dashboard/@manager/feedback/components/EventCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoEventFound from "@/app/dashboard/@manager/feedback/components/NoEventFound";
import EventsLoading from "@/app/dashboard/@manager/feedback/components/EventsLoading";

export default function EventList({
  queryData,
}: {
  queryData: GetEventSendData;
}) {
  const eventsMuation = useMutation({
    mutationFn: (queryData: GetEventSendData) => getEvent(queryData),
  });

  useEffect(() => {
    eventsMuation.mutate(queryData);
  }, []);
  return (
    <div className="w-full">
      {eventsMuation.isPending ? (
        <EventsLoading />
      ) : eventsMuation.data?.Data.length === 0 ? (
        <NoEventFound />
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {eventsMuation.data?.Data.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
