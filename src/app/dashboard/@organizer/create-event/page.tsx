import CreateEventForm from "@/components/forms/CreateEventForm";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-1 gap-4">
      <div className="flex-1"></div>
      <div className="flex-1">
        <CreateEventForm />
      </div>
    </div>
  );
}
