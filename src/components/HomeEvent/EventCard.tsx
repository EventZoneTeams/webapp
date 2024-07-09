import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Event } from "@/types/event";
import { format } from "date-fns";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card className=" hover:cursor-pointer w-[340px] bg-transparent border-none">
      <img
        src={event.ThumbnailUrl ?? ""}
        alt={event.Name}
        className="rounded-lg w-full h-[180px] object-cover"
      />
      <CardContent className=" w-full flex pt-4 px-0">
        <div>
          <div className="text-md">{event.Name}</div>
          <div className="flex items-center justify-between gap-2 mt-2 text-tertiary">
            <div className="flex items-center text-md">
              <Calendar size={20} className="mr-2" />
              {format(event.EventStartDate, "HH:mm, dd MMMM yyyy")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
