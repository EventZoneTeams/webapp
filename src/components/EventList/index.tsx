import React, { useEffect } from "react";
import { getEvent, GetEventSendData } from "@/api/event";
import { useMutation } from "@tanstack/react-query";

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
    <div>
      {eventsMuation.isPending ? (
        <div>Loading...</div>
      ) : (
        <div>
          {eventsMuation.data?.map((event, index) => (
            <div key={index}>{event.Name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
