import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event";
import { format } from "date-fns";
import Image from "next/image";

export const Post = (event: Event) => {
  return (
    <div className="flex gap-4 p-2 h-40">
      <div className="">
        {event.ThumbnailUrl ? (
          <Image
            src={event.ThumbnailUrl}
            alt="Event Image"
            width={1600}
            height={900}
            className="rounded-md object-cover aspect-video h-full"
          />
        ) : (
          <div className="h-full aspect-video bg-secondary rounded-md animate-pulse"></div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="text-lg font-semibold flex items-center gap-2">
            {event.Name}
            {event.IsDonation ? (
              <Badge className="bg-green-100 text-green-800">Donation</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">No Donation</Badge>
            )}
          </div>
          <div className="text-sm italic text-gray-500">
            {format(event.EventStartDate, "P")} -{" "}
            {format(event.EventEndDate, "P")}
          </div>
          <div className="line-clamp-2 text-gray-500 text-sm">
            {event.Description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consectetur rerum amet ratione voluptatibus
            dolores saepe quod recusandae reprehenderit sed? Ut dolore nemo
            voluptates excepturi voluptate dicta fugit assumenda magni
            explicabo.
          </div>
        </div>
        {event.IsDonation ? (
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
        )}
      </div>
    </div>
  );
};
