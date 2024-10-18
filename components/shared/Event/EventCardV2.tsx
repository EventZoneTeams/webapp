import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Event as EventType } from "@/types/event";
import Image from "next/image";

export default function EventCard({
  event,
  size = "small",
  textSize = "normal",
}: {
  event: EventType;
  size?: "small" | "large";
  textSize?: "small" | "normal";
}) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg",
        "aspect-video w-full",
        size === "large" ? "max-w-2xl" : "max-w-sm",
      )}
    >
      <Image
        src={event?.thumbnailUrl!}
        alt={event.name}
        layout="fill"
        objectFit="cover"
        className="transition-transform group-hover:scale-105"
      />
      <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
        <h3
          className={cn(
            "line-clamp-1 font-bold leading-tight drop-shadow-md",
            size === "large"
              ? "text-2xl"
              : textSize === "small"
                ? "text-base"
                : "text-lg",
          )}
        >
          {event.name}
        </h3>
        <p
          className={cn(
            "mt-1 line-clamp-1 drop-shadow-md",
            textSize === "small" ? "text-xs" : "text-sm",
          )}
        >
          {new Date(event.eventStartDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // Use 12-hour format
          })}
          ,{" "}
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            new Date(event.eventStartDate),
          )}{" "}
          {new Date(event.eventStartDate).getDate() ===
            new Date(event.eventEndDate).getDate() &&
          new Date(event.eventStartDate).getMonth() ===
            new Date(event.eventEndDate).getMonth() &&
          new Date(event.eventStartDate).getFullYear() ===
            new Date(event.eventEndDate).getFullYear()
            ? `${new Date(event.eventStartDate).getDate()}th`
            : new Date(event.eventStartDate).getMonth() ===
                  new Date(event.eventEndDate).getMonth() &&
                new Date(event.eventStartDate).getFullYear() ===
                  new Date(event.eventEndDate).getFullYear()
              ? `${new Date(event.eventStartDate).getDate()} - ${new Date(event.eventEndDate).getDate()}`
              : new Date(event.eventStartDate).getFullYear() ===
                  new Date(event.eventEndDate).getFullYear()
                ? `${new Date(event.eventStartDate).getDate()} - ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(event.eventEndDate))} ${new Date(event.eventEndDate).getDate()}`
                : `, ${new Date(event.eventStartDate).getFullYear()} - ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(event.eventEndDate))} ${new Date(event.eventEndDate).getDate()}, ${new Date(event.eventEndDate).getFullYear()}`}
          {new Date(event.eventStartDate).getFullYear() !==
            new Date().getFullYear() &&
          new Date(event.eventStartDate).getFullYear() ===
            new Date(event.eventEndDate).getFullYear()
            ? `, ${new Date(event.eventStartDate).getFullYear()}`
            : ""}
          {" · "}
          {event.location.display}
        </p>

        <Badge
          variant="secondary"
          className={cn(
            "mt-2 line-clamp-1 inline-block bg-white/80 text-black",
            textSize === "small" ? "text-xs" : "text-sm",
          )}
        >
          {event.eventCategory.title}
        </Badge>
      </CardContent>
    </Card>
  );
}
