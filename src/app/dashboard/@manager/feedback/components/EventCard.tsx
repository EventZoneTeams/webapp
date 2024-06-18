import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValidImageUrl } from "@/lib/image";

import { Event } from "@/types/event";
import { format } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function EventCard({ event }: { event: Event }) {
  const [isValidImage, setIsValidImage] = useState<boolean>(false);

  useEffect(() => {
    if (event.ThumbnailUrl) {
      isValidImageUrl(event.ThumbnailUrl).then((res) => {
        setIsValidImage(res as boolean);
      });
    }
  }, [event.ThumbnailUrl]);
  return (
    <Card className="flex gap-2 h-44 w-full relative">
      <div className="aspect-video h-full">
        {event.ThumbnailUrl ? (
          isValidImage ? (
            <Image
              src={event.ThumbnailUrl ?? ""}
              alt={event.Name}
              width={500}
              height={500}
              className="w-full h-full rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
              <p>Invalid Image</p>
            </div>
          )
        ) : (
          <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center">
            <p>No Image</p>
          </div>
        )}
      </div>

      <div className="flex-1">
        <CardHeader>
          <CardTitle className="line-clamp-1">{event.Name}</CardTitle>
          <CardDescription>
            {format(event.EventStartDate, "PPpp")} -{" "}
            {format(event.EventEndDate, "PPpp")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2">
            {event.Description} Imagine you’re implementing a beautiful design
            you or someone on your team carefully crafted in Figma. You’ve
            nailed all the different layouts at each breakpoint, perfected the
            whitespace and typography, and the photography you’re using is
            really bringing the design to life. It looks totally amazing — until
            you connect it your actual production content and realize that your
            beautiful grid of blog cards falls apart because, of course, real
            article excerpts aren’t all magically exactly three lines long, and
            now each card is a different height.
          </p>
        </CardContent>
      </div>
      <Badge className="absolute top-2 left-2 bg-blue-200 text-blue-500">
        {event.Status}
      </Badge>
    </Card>
  );
}
