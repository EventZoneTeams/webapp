import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventImage from "@/components/EventImage";

export default function EventCard({
  event,
  status,
}: {
  event: Event;
  status: boolean;
}) {
  return (
    <Card className="w-full  hover:ring hover:cursor-pointer bg-background relative">
      {status && (
        <Badge
          className={cn(
            "absolute top-2 right-2",
            event.Status === "PENDING" && "bg-blue-200 text-blue-700",
            event.Status === "APPROVED" && "bg-green-200 text-green-700",
            event.Status === "REJECTED" && "bg-red-200 text-red-700"
          )}
        >
          {event.Status}
        </Badge>
      )}
      <EventImage src={event.ThumbnailUrl ?? ""} />
      <CardContent className=" w-full flex gap-4 pt-4 ">
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
            <Badge className="line-clamp-1">{event.EventCategory.Title}</Badge>
            <Badge
              className={cn(
                "line-clamp-1",
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
              <Calendar size={15} className="mr-2 text-sm " />
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
