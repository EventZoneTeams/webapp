"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EventCard from "@/components/shared/Event/EventCard";
import Filter from "@/components/shared/Event/Filter";
import { Event } from "@/lib/api/event";
import { GetEventsParams } from "@/types/api/event";
import { Event as EventType } from "@/types/event";

export default function Component() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [maxPage, setMaxPage] = useState<number>(1);
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
          setMaxPage(response.paging?.totalPages || 1);
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

  const groupEventsByDate = (events: EventType[]) => {
    const grouped = events.reduce(
      (acc, event) => {
        const date = format(new Date(event.createdAt), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(event);
        return acc;
      },
      {} as Record<string, EventType[]>,
    );

    return Object.entries(grouped).sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime(),
    );
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="container mx-auto px-4">
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manage Event</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="my-6">
        <Filter maxPage={maxPage}>
          {isLoading ? (
            <div className="flex h-52 items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="space-y-8">
              {groupedEvents.map(([date, dateEvents]) => (
                <div key={date}>
                  <p className="mb-4 rounded-lg text-sm font-normal text-muted-foreground">
                    {format(new Date(date), "MMMM d, yyyy")}
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {dateEvents.map((event) => (
                      <Link
                        href={`/dashboard/manage-events/${event.id}`}
                        key={event.id}
                        className="block"
                      >
                        <EventCard event={event} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="flex h-52 items-center justify-center">
                  No events found
                </div>
              )}
            </div>
          )}
        </Filter>
      </div>
    </div>
  );
}
