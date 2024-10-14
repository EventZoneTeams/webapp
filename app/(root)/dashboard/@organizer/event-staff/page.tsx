"use client";

import { Event } from "@/lib/api/event";
import React, { useEffect, useState } from "react";
import { Event as EventType } from "@/types/event";
import EventCard from "@/components/shared/Event/EventCard";
import { GetEventsParams } from "@/types/api/event";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "next-view-transitions";
import Filter from "@/components/shared/Event/Filter";
import { useAuthStore } from "@/stores/authStore";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const [params, setParams] = useState<GetEventsParams>({
    UserId: user?.id,
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
    if (!user) return;
    const updatedParams = {
      ...params,
      UserId: user.id,
    };
    setIsLoading(true);
    Event.get(updatedParams)
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
  }, [params, user]);

  return (
    <div>
      <div>
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-primary">
                Events
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-6">
        <Filter maxPage={10}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4 rounded py-4">
              {events.map((event) => (
                <Link href={`/dashboard/events/${event.id}`} key={event.id}>
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
        </Filter>
      </div>
    </div>
  );
}
