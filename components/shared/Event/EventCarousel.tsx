import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Event as EventType } from "@/types/event";
import Link from "next/link";
import EventCard from "./EventCardV2";
import { cn } from "@/lib/utils";

export default function EventCarousel({
  title,
  events,
  itemSize = "small",
  textSize = "normal",
}: {
  title: string;
  events: EventType[];
  itemSize?: "small" | "large";
  textSize?: "small" | "normal";
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem
              key={event.id}
              className={cn(
                itemSize === "large"
                  ? "md:basis-1/2"
                  : "md:basis-1/2 lg:basis-1/3",
              )}
            >
              <Link href={`/${event.id}`}>
                <EventCard event={event} size={itemSize} textSize={textSize} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
