"use client";

import { getEventFeedBack } from "@/api/feedback";
import useFeedback from "@/hooks/useFeedback";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useMemo } from "react";

export default function FeedBackList({ eventId }: { eventId: number }) {
  const { getEventFeedBackMutation, trigger } = useFeedback();

  useEffect(() => {
    getEventFeedBackMutation.mutate(eventId);
  }, [eventId, trigger]);

  const feedBacks = useMemo(
    () => getEventFeedBackMutation.data,
    [getEventFeedBackMutation.data]
  );

  console.log(feedBacks);

  return (
    <div>
      <div className=" space-y-4 p-4">
        {feedBacks?.map((feedBack, index) => (
          <div className="p-2 rounded-md bg-background" key={index}>
            <div className="">
              <div className="text-lg">{feedBack.Content}</div>
              <div className="text-sm text-gray-500 text-right">
                {format(new Date(feedBack.CreatedAt), "yyyy-MM-dd HH:mm")}
              </div>
              <div className="text-sm text-gray-500 text-right">
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
