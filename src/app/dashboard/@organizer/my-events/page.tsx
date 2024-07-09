"use client";

import React, { use, useEffect } from "react";
import useEvent from "@/hooks/useEvent";
import useAuth from "@/hooks/useAuth";
import EventList from "@/components/Event/EventList";
import EventsLoading from "@/components/Event/EventsLoading";
import NoEventFound from "@/components/Event/NoEventFound";
import Link from "next/link";
import EventCard from "@/components/Event/EventCard";

export default function page() {
  const { authUser } = useAuth();
  const { eventsMuation, queryObj, setQueryObj, reset } = useEvent();
  useEffect(() => {
    if (authUser) {
      setQueryObj({
        ...queryObj,
        UserId: authUser.Id,
        "page-number": 1,
        "page-size": 10,
      });
    }
  }, [authUser]);

  useEffect(() => {
    eventsMutation.mutate(queryObj);
  }, [queryObj]);

  return (
    <div>
      <div className="w-full">
        {eventsMutation.isPending ? (
          <EventsLoading />
        ) : eventsMutation.data?.Data.length === 0 ? (
          <NoEventFound />
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full p-4">
            {eventsMutation.data?.Data.map((event, index) => (
              <Link
                key={index}
                className=" flex items-center justify-center"
                href={`/dashboard/my-events/${event.Id}`}
              >
                <EventCard event={event} status />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
