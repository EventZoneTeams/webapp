"use client";

import EventDetails from "@/app/dashboard/@manager/feedback/event/[id]/components/EventDetails";
import FeedBackList from "@/app/dashboard/@manager/feedback/event/[id]/components/FeedBackList";
import FeedBackForm from "@/components/forms/manager/FeedBackForm";
import FullpageLoader from "@/components/Loading/fullpage-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import useEvent from "@/hooks/useEvent";
import useFeedback from "@/hooks/useFeedback";
import { useEffect, useMemo } from "react";
export default function page({ params }: { params: { id: string } }) {
  const { getEventByIdMutation } = useEvent();
  const { trigger } = useFeedback();

  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, [params.id, trigger]);

  const event = useMemo(
    () => getEventByIdMutation.data,
    [getEventByIdMutation.data]
  );
  return event ? (
    <div className=" grid grid-cols-2 gap-4">
      <ScrollArea className="h-[calc(100vh_-_theme(spacing.28))] col-span-1 pr-4 border-b-2">
        <EventDetails event={event} />
      </ScrollArea>
      <div className="flex flex-col gap-2 pb-4 h-[calc(100vh_-_theme(spacing.28))]">
        <ScrollArea className="h-[calc(100vh_-_theme(spacing.28))] col-span-1 border rounded-md">
          <FeedBackList eventId={Number(params.id)} />
        </ScrollArea>
        {event.Status === "PENDING" && <FeedBackForm />}
      </div>
    </div>
  ) : (
    <FullpageLoader />
  );
}
