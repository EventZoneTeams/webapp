import EventsLoading from "@/components/Event/EventsLoading";
import NoEventFound from "@/components/Event/NoEventFound";
import EventCard from "@/components/Event/EventCard";
import useEvent from "@/hooks/useEvent";
import Link from "next/link";
import { useEffect } from "react";

export default function EventList() {
  const { queryObj, eventsMuation } = useEvent();

  useEffect(() => {
    eventsMuation.mutate(queryObj);
  }, [queryObj]);

  return (
    <div className="w-full">
      {eventsMuation.isPending ? (
        <EventsLoading />
      ) : eventsMuation.data?.Data.length === 0 ? (
        <NoEventFound />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full p-4">
          {eventsMuation.data?.Data.map((event, index) => (
            <Link
              key={index}
              className=" flex items-center justify-center"
              href={`/dashboard/feedback/event/${event.Id}`}
            >
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
