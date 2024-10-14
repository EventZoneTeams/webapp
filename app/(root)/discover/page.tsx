"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Event } from "@/lib/api/event";
import { GetEventsParams } from "@/types/api/event";
import { Event as EventType } from "@/types/event";
import { Skeleton } from "@/components/ui/skeleton";

const EventCard = ({
  event,
  size = "small",
  textSize = "normal",
}: {
  event: EventType;
  size?: "small" | "large";
  textSize?: "small" | "normal";
}) => (
  <Card
    className={cn(
      "group relative overflow-hidden transition-all hover:shadow-lg",
      size === "large" ? "h-[400px]" : "h-[250px]",
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

const EventCarousel = ({
  title,
  events,
  itemSize = "small",
  textSize = "normal",
}: {
  title: string;
  events: EventType[];
  itemSize?: "small" | "large";
  textSize?: "small" | "normal";
}) => (
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

const EventCardSkeleton = ({
  size = "small",
}: {
  size?: "small" | "large";
}) => (
  <Card
    className={cn(
      "group relative overflow-hidden transition-all hover:shadow-lg",
      size === "large" ? "h-[400px]" : "h-[250px]",
    )}
  >
    <Skeleton className="h-full w-full animate-pulse" />
    <CardContent className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
      <Skeleton className="h-6 w-3/4 animate-pulse bg-white/50" />
      <Skeleton className="mt-2 h-4 w-1/2 animate-pulse bg-white/50" />
      <Skeleton className="mt-2 h-5 w-1/4 animate-pulse bg-white/80" />
    </CardContent>
  </Card>
);

const EventCarouselSkeleton = ({
  title,
  itemSize = "small",
}: {
  title: string;
  itemSize?: "small" | "large";
}) => (
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
        {[...Array(3)].map((_, index) => (
          <CarouselItem
            key={index}
            className={cn(
              itemSize === "large"
                ? "md:basis-1/2"
                : "md:basis-1/2 lg:basis-1/3",
            )}
          >
            <EventCardSkeleton size={itemSize} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </section>
);

export default function DiscoverPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [params, setParams] = useState<GetEventsParams>({
    SearchTerm: searchParams.get("SearchTerm") || undefined,
    EventCategoryId: searchParams.get("EventCategoryId") || undefined,
    Status: parseInt(searchParams.get("Status") as string) || undefined,
    PageSize: parseInt(searchParams.get("PageSize") as string) || 20,
    PageNumber: parseInt(searchParams.get("PageNumber") as string) || 1,
  });

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      SearchTerm: searchParams.get("SearchTerm") || undefined,
      EventCategoryId: searchParams.get("EventCategoryId") || undefined,
      Status: parseInt(searchParams.get("Status") as string) || undefined,
      PageSize: parseInt(searchParams.get("PageSize") as string) || 20,
      PageNumber: parseInt(searchParams.get("PageNumber") as string) || 1,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await Event.get(params);
        if (response.isSuccess && response.data) {
          const sortedList = response.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setEvents(sortedList);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [params]);

  const featuredEvents = events.filter((event) => event.status === "PUBLISHED");

  const upcomingEvents = events;
  // .filter((event) => event.status === "PUBLISHED");

  const trendingEvents = events;
  // .filter((event) => event.status === "PUBLISHED");

  const specialEvents = events;
  // .filter((event) => event.status === "PUBLISHED");

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div>
          <EventCarouselSkeleton title="" itemSize="large" />
          <EventCarouselSkeleton title="Special Events" />
          <EventCarouselSkeleton title="Trending Now" />
          <EventCarouselSkeleton title="Upcoming Events" />
        </div>
      ) : (
        <>
          {/* Featured Events Carousel */}
          <EventCarousel title="" events={featuredEvents} itemSize="large" />

          {/* Special Events Carousel */}
          <EventCarousel
            title="Special Events"
            events={specialEvents}
            textSize="small"
          />

          {/* Trending Now Carousel */}
          <EventCarousel
            title="Trending Now"
            events={trendingEvents}
            textSize="small"
          />

          {/* Upcoming Events Carousel */}
          <EventCarousel
            title="Upcoming Events"
            events={upcomingEvents}
            textSize="small"
          />

          {events.length === 0 && (
            <div className="flex h-52 items-center justify-center text-muted-foreground">
              No events found
            </div>
          )}
        </>
      )}
    </div>
  );
}
