import AddEventForm from "@/app/(root)/dashboard/@organizer/events/create/components/AddEventForm";
import React from "react";

export default function page() {
  return (
    <div className="rounded bg-background p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-primary">Create Event</h1>
      <AddEventForm />
    </div>
  );
}
