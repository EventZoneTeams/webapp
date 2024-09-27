import EventDetail from "@/app/(root)/dashboard/@organizer/events/[slug]/component/EventDetail";
import React, { Suspense } from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetail params={params} />
      </Suspense>
    </div>
  );
}
