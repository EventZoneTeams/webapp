"use client";

import { getEventById } from "@/api/event";
import EventDetails from "@/app/dashboard/@manager/feedback/event/[id]/components/EventDetails";
import FeedBackList from "@/app/dashboard/@manager/feedback/event/[id]/components/FeedBackList";
import FeedBackForm from "@/components/forms/manager/FeedBackForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
export default function page({ params }: { params: { id: string } }) {
  const getEventByIdMutation = useMutation({
    mutationFn: (id: number) => getEventById(id),
  });

  useEffect(() => {
    getEventByIdMutation.mutate(Number(params.id));
  }, [params.id]);

  const event = useMemo(
    () => getEventByIdMutation.data,
    [getEventByIdMutation.data]
  );

  return event ? (
    <div className=" grid grid-cols-2 gap-4">
      <ScrollArea className="h-[calc(100vh_-_theme(spacing.52))] col-span-1 px-5 border-b-2">
        <EventDetails event={event} />
      </ScrollArea>
      <div className="flex flex-col gap-2">
        <ScrollArea className="h-[calc(100vh_-_theme(spacing.52)_-_10.5rem)] col-span-1 px-5 border rounded-md">
          <FeedBackList eventId={Number(params.id)} />
        </ScrollArea>
        <FeedBackForm />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
