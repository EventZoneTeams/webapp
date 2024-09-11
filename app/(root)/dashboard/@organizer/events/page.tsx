"use client";

import { Event } from "@/lib/api/event";
import React, { useEffect, useState } from "react";
import { Event as EventType } from "@/types/event";
import EventCard from "@/components/shared/EventCard";

export default function Page() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    Event.get({}).then((response) => {
      if (response.isSuccess && response.data) {
        const sortedList = response.data.sort(
          (a, b) =>
            new Date(b.eventStartDate).getTime() -
            new Date(a.eventStartDate).getTime(),
        );
        setEvents(response.data);
      }
    });
  }, []);

  console.log(events);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}
