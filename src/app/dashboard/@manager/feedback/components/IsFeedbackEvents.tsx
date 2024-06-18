import { GetEventSendData } from "@/api/event";
import EventsLoading from "@/app/dashboard/@manager/feedback/components/EventsLoading";
import EventList from "@/components/EventList";
import React from "react";

export default function IsFeedbackEvents() {
  const queryObj: GetEventSendData = {
    status: "ISFEEDBACK",
    "page-size": 10,
    "page-number": 1,
  };
  return <EventList queryData={queryObj} />;
}
