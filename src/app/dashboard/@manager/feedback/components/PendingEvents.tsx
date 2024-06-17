import { GetEventSendData } from "@/api/event";
import EventList from "@/components/EventList";
import React from "react";

export default function PendingEvents() {
  const queryObj: GetEventSendData = {
    Status: "PENDING",
    PageSize: 10,
    PageNumber: 1,
  };
  return <EventList queryData={queryObj} />;
}
