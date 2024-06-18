import React, { useEffect } from "react";
import { getEvent, GetEventSendData } from "@/api/event";
import { useMutation } from "@tanstack/react-query";
import NoEventFound from "@/app/dashboard/@manager/feedback/components/NoEventFound";
import EventsLoading from "@/app/dashboard/@manager/feedback/components/EventsLoading";
import EventCard from "@/components/EventCard";

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
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-10">
          {eventsMuation.data?.Data.map((event, index) => (
            <div key={index} className=" flex items-center justify-center">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
