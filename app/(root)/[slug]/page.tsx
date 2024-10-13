import EventDetail from "@/app/(root)/[slug]/component/EventDetail";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <EventDetail params={params} />
    </div>
  );
}
