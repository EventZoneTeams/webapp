import { Event } from "@/types/event";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="group flex w-96 gap-4 rounded p-2 backdrop-blur-3xl hover:cursor-pointer hover:bg-black/5">
      <Image
        src={event.thumbnailUrl}
        width={200}
        height={200}
        alt={event.name}
        className="size-24 rounded group-hover:opacity-80"
      />
      <div className="flex flex-col">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{event.name}</h2>
          <div className="text-sm text-primary/50">
            {format(new Date(event.eventStartDate), "Pp")}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-primary/50">
          <Avatar className="size-8 border-none">
            <AvatarImage src={event.user.imageUrl} alt={event.user.fullName} />
            <AvatarFallback className="text-sm">
              {event.user.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>{event.user.fullName}</div>
        </div>
      </div>
    </div>
  );
}
