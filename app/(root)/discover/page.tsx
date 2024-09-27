"use client";

import EventCard from "@/components/shared/Event/EventCard";
import { Event } from "@/lib/api/event";
import { GetEventsParams } from "@/types/api/event";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Event as EventType } from "@/types/event";

export default function DiscoverPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [params, setParams] = useState<GetEventsParams>({
    SearchTerm: searchParams.get("SearchTerm") || undefined,
    EventCategoryId: searchParams.get("EventCategoryId") || undefined,
    Status: parseInt(searchParams.get("Status") as string) || undefined,
    PageSize: parseInt(searchParams.get("PageSize") as string) || 10,
    PageNumber: parseInt(searchParams.get("PageNumber") as string) || 1,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      SearchTerm: searchParams.get("SearchTerm") || undefined,
      EventCategoryId: searchParams.get("EventCategoryId") || undefined,
      Status: parseInt(searchParams.get("Status") as string) || undefined,
      PageSize: parseInt(searchParams.get("PageSize") as string) || 10,
      PageNumber: parseInt(searchParams.get("PageNumber") as string) || 1,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await Event.get(params);
        if (response.isSuccess && response.data) {
          const sortedList = response.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setEvents(sortedList);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [params]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 rounded py-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {events.map((event) => (
            <Link href={`/${event.id}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
          {events.length === 0 && (
            <div className="col-span-full flex h-52 items-center justify-center">
              No events found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
