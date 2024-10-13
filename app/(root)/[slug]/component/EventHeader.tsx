import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Event } from "@/types/event";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="mb-8">
      <Image
        alt={event?.name!}
        src={event?.thumbnailUrl!}
        width={800}
        height={400}
        className="h-64 w-full rounded-lg object-cover shadow-md"
      />
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{event.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(event?.eventEndDate!, "pp")}
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4" />
              {event?.location.display}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              {format(event?.eventEndDate!, "PP")}
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage
                src={event?.user.imageUrl!}
                alt={event?.user.fullName}
              />
              <AvatarFallback>
                {event?.user.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              Hosted by {event?.user.fullName}
            </span>
          </div>
        </div>
        <Button
          variant={isFollowing ? "outline" : "default"}
          onClick={onToggleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
          {/* ({event.followers}) */}
        </Button>
      </div>
      <div className="w-full space-y-2 mt-4">
        <p className="border-b-[1px] border-primary/20 pb-2 text-sm font-semibold text-primary/50">
          About Event
        </p>
        <DisplayContent content={event?.description!} />
      </div>
    </div>
  );
}
