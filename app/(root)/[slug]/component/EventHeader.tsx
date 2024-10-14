"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Event } from "@/types/event";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DisplayContent from "@/components/minimal-tiptap/display-content";

export default function EventHeader({
  event,
  isFollowing,
  onToggleFollow,
}: {
  event: Event;
  isFollowing: boolean;
  onToggleFollow: () => void;
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = event?.description || "";

  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-card/20 shadow-lg">
      <div className="relative h-80">
        <Image
          alt={event?.name!}
          src={event?.thumbnailUrl!}
          layout="fill"
          objectFit="cover"
          className="brightness-90"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
          <h1 className="mb-2 text-4xl font-bold text-white drop-shadow-md">
            {event.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white drop-shadow">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(event?.eventEndDate!, "PPP")}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              {format(event?.eventEndDate!, "p")}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage
                src={event?.user.imageUrl!}
                alt={event?.user.fullName}
              />
              <AvatarFallback>
                {event?.user.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Hosted by
              </p>
              <p className="font-semibold">{event?.user.fullName}</p>
            </div>
          </div>
          <Button
            variant={isFollowing ? "outline" : "default"}
            onClick={onToggleFollow}
            className="px-6"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <div className="mb-6 flex items-center space-x-4 cursor-default">
          <Badge variant="secondary" className="px-3 py-1">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {event?.location.display}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <UserIcon className="mr-2 h-4 w-4" />
            {event.attendees} Attendees
          </Badge>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About Event</h2>
          <div
            className={`relative ${showFullDescription ? "" : "line-clamp-4 overflow-hidden"}`}
          >
            <DisplayContent content={description} />
            {!showFullDescription && (
              <div className="absolute bottom-0 left-0 right-0 h-12" />
            )}
          </div>

          {description.length > 300 && (
            <Button
              variant="link"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="h-auto p-0 font-normal text-primary"
            >
              {showFullDescription ? (
                <div className="flex items-center text-primary/50 hover:text-primary">
                  View Less <ChevronUpIcon className="ml-1 h-4 w-4" />
                </div>
              ) : (
                <div className="flex items-center text-primary/50 hover:text-primary">
                  View More <ChevronDownIcon className="ml-1 h-4 w-4" />
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
