import React, { useEffect } from "react";
import { getEvent, GetEventSendData } from "@/api/event";
import { useMutation } from "@tanstack/react-query";
import EventCard from "@/app/dashboard/@manager/feedback/components/EventCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EventList({
  queryData,
}: {
  queryData: GetEventSendData;
}) {
  const eventsMuation = useMutation({
    mutationFn: (queryData: GetEventSendData) => getEvent(queryData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    eventsMuation.mutate(queryData);
  }, []);
  return (
    <div className="w-full">
      {eventsMuation.isPending ? (
        <div>Loading...</div>
      ) : (
        <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))]">
          {eventsMuation.data?.length === 0 ? (
            <div>No events found</div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {eventsMuation.data?.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
