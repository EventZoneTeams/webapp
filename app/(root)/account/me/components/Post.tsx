import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event";
import { format } from "date-fns";
import Image from "next/image";

export const Post = (event: Event) => {
  return (
    <div className="flex h-40 gap-4 p-2">
      <div className="">
        {event.thumbnailUrl ? (
          <Image
            src={event.thumbnailUrl}
            alt="Event Image"
            width={1600}
            height={900}
            className="aspect-video h-full rounded-md object-cover"
          />
        ) : (
          <div className="aspect-video h-full animate-pulse rounded-md bg-secondary"></div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-lg font-semibold">
            {event.name}
            {/* {event.EventCampaigns ? (
              <Badge className="bg-green-100 text-green-800">Donation</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">No Donation</Badge>
            )} */}
          </div>
          <div className="text-sm italic text-gray-500">
            {format(event.eventStartDate, "P")} -{" "}
            {format(event.eventEndDate, "P")}
          </div>
          <div className="line-clamp-2 text-sm text-gray-500">
            {event.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consectetur rerum amet ratione voluptatibus
            dolores saepe quod recusandae reprehenderit sed? Ut dolore nemo
            voluptates excepturi voluptate dicta fugit assumenda magni
            explicabo.
          </div>
        </div>
        {/* {event.EventCampaigns ? (
          <div>
            <Progress
              value={33}
              max={100}
              className={cn("h-2", "bg-secondary", "rounded-md")}
              indicatorColor="bg-gradient-to-r from-primary to-tertiary"
            />
          </div>
        ) : (
          <div>
            <Progress
              value={100}
              max={100}
              className={cn("h-2", "bg-secondary", "rounded-md")}
              indicatorColor="bg-gradient-to-r from-primary to-tertiary"
            />
          </div>
        )} */}
      </div>
    </div>
  );
};
