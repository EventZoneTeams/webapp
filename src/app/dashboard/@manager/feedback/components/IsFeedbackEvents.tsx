import { GetEventSendData } from "@/api/event";
import EventList from "@/components/EventList";
import React from "react";

export default function IsFeedbackEvents() {
  const queryObj: GetEventSendData = {
    Status: "ISFEEDBACK",
    PageSize: 10,
    PageNumber: 1,
  };
  return <EventList queryData={queryObj} />;
}
