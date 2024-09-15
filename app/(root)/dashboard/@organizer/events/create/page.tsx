import AddEventForm from "@/app/(root)/dashboard/@organizer/events/create/components/AddEventForm";
import React from "react";

export default function page() {
  return (
    <div className="my-4 rounded shadow backdrop-blur-md">
      <h1 className="mb-6 text-2xl font-bold text-primary">Create Event</h1>
      <AddEventForm />
    </div>
  );
}
