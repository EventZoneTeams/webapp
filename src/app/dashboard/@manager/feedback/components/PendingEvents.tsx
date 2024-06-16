import { GetEventSendData } from "@/api/event";
import EventList from "@/components/EventList";
import React, { Suspense } from "react";

export default function PendingEvents() {
  const queryObj: GetEventSendData = {
    Status: "PENDING",
    PageSize: 10,
    PageNumber: 1,
  };
  return (
    <div>
      <EventList queryData={queryObj} />
    </div>
  );
}
