"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "./EventCard";
import { Badge } from "../ui/badge";
import { useEffect } from "react";
import useEvent from "@/hooks/useEvent";
import Link from "next/link";

export function EventCarousel({
  category,
  categoryId,
}: {
  category: String;
  categoryId: number;
}) {
  const { queryObj, eventsMutation } = useEvent();

  useEffect(() => {
    eventsMutation.mutate({ ...queryObj, "event-category-id": categoryId });
  }, [queryObj]);

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Badge className=" h-[40px] rounded-sm bg-blue-400 hover:bg-blue-400"></Badge>
        <p className="text-tertiary ml-3 text-lg">
          {category ? category : "Category"}
        </p>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="w-full">
          {eventsMutation.data?.Data.map((event, index) => (
            <CarouselItem key={index} className="p-0 ml-4 basis-[26%] ">
              <Link key={index} href={`/event/${event.Id}`}>
                <EventCard event={event} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
