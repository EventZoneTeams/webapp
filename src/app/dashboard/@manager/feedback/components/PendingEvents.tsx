import { GetEventSendData } from "@/api/event";
import EventList from "@/components/EventList";
import React from "react";

export default function PendingEvents() {
  const queryObj: GetEventSendData = {
    status: "PENDING",
    "page-size": 10,
    "page-number": 1,
  };
  return <EventList queryData={queryObj} />;
}
