"use client";

import { getEventFeedBack } from "@/api/feedback";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useMemo } from "react";

export default function FeedBackList({ eventId }: { eventId: number }) {
  const getEventFeedBackMutation = useMutation({
    mutationFn: (eventId: number) => getEventFeedBack(eventId),
  });

  useEffect(() => {
    getEventFeedBackMutation.mutate(eventId);
  }, [eventId]);

  const feedBacks = useMemo(
    () => getEventFeedBackMutation.data,
    [getEventFeedBackMutation.data]
  );

  console.log(feedBacks);

  return (
    <div>
      <div className="text-right py-5 space-y-3">
        {feedBacks?.map((feedBack, index) => (
          <div className="flex justify-end" key={index}>
            <div className="">
              <div className="bg-tertiary p-2 rounded-lg px-4 py-2 text-left text-white">
                {feedBack.Content}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {format(new Date(feedBack.CreatedAt), "yyyy-MM-dd HH:mm")}
              </div>
              <div className="text-xs text-gray-500">
                {feedBack.User.FullName ?? "manager"} -{" "}
                {feedBack.User.Email ?? "manager"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
