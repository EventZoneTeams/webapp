import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Event } from "@/types/event";
import { format } from "date-fns";

export default function EventTop({ event }: { event: any }) {
  return (
    <Card className=" hover:cursor-pointer bg-transparent border-none lg:w-[49%]">
      <img
        src={event.ThumbnailUrl ?? ""}
        alt={event.Name}
        className="rounded-lg w-full h-[300px] object-cover"
      />
      <CardContent className=" w-full flex pt-4 px-0">
        <div>
          <div className="text-lg">{event.Name}</div>
          <div className="flex items-center justify-between gap-2 mt-2 text-blue-400">
            <div className="flex items-center text-lg">
              <Calendar size={25} className="mr-2" />
              {format(event.EventStartDate, "HH:mm, dd MMMM yyyy")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
