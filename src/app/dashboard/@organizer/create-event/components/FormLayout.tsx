import EventPreview from "@/app/dashboard/@organizer/create-event/components/EventPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-1 ">
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <EventPreview />
        </CardContent>
      </Card>
      <div>{children}</div>
    </div>
  );
}
