"use client";

import { getEvent } from "@/api/event";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { isValidImageUrl } from "@/lib/image";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <Card className="w-full bg-transparent hover:ring hover:cursor-pointer">
      <div className="aspect-video h-full">
        {event.ThumbnailUrl ? (
          isValidImage ? (
            <Image
              src={event.ThumbnailUrl ?? ""}
              alt={event.Name}
              width={500}
              height={500}
              className="w-full h-full rounded-t-md"
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
      <CardContent className=" w-full flex gap-4 pt-2">
        <div className="">
          <Avatar className="size-10">
            <AvatarImage src={event.User?.Image} alt={event.User?.FullName} />
            <AvatarFallback className="bg-tertiary text-white ">
              {event.User?.FullName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="font-semibold text-sm line-clamp-1">
            ({event.University === "" ? "No University" : event.University}){" "}
            {event.Name}
          </p>
          <div className="mt-2 flex gap-2">
            <Badge>{event.EventCategory.Title}</Badge>
            <Badge
              className={cn(
                event.IsDonation
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              )}
            >
              {event.IsDonation ? "Donation" : "No Donation"}
            </Badge>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-center text-sm">
              <Calendar size={15} className="mr-2 text-sm" />
              {formatDistanceToNow(event.CreatedAt, {
                includeSeconds: true,
              })}{" "}
              ago
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
