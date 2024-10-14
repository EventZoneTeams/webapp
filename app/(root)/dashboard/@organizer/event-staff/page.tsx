"use client";

import React, { useEffect, useState } from "react";
import { Event as EventType } from "@/types/event";
import EventCard from "@/components/shared/Event/EventCard";
import { Link } from "next-view-transitions";
import Filter from "@/components/shared/Event/Filter";
import { useAuthStore } from "@/stores/authStore";
import { Staff } from "@/lib/api/staff";

export default function Page() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    Staff.getEventStaff()
      .then((response) => {
        if (response.isSuccess && response.data) {
          const sortedList = response.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setEvents(sortedList);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className="mb-6">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4 rounded py-4">
          {events.map((event) => (
            <Link href={`/dashboard/event-staff/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
          {events.length === 0 && (
            <div className="col-span-3 flex h-52 items-center justify-center">
              No events found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
