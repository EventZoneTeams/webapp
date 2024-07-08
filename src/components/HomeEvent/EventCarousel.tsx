import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "./EventCard";
import { Event } from "@/types/event";
import { Badge } from "../ui/badge";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useEvent from "@/hooks/useEvent";

export function EventCarousel({
  event,
  category,
}: {
  event: Event;
  category: String;
}) {
  const searchParams = useSearchParams();
  const eventCategoryIdParam = searchParams.get("event-category-id");
  const { setQueryObj, queryObj, eventsMutation } = useEvent();



  useEffect(() => {
    eventsMutation.mutate({ ...queryObj, "event-category-id": 1 });
  }, [queryObj]);

  return (
    <div>
      <div className="flex items-center mb-2">
        <Badge className=" h-[50px] rounded-sm bg-blue-400 hover:bg-blue-400"></Badge>
        <p className="text-blue-400 ml-3 text-lg">
          {category ? category : "Category"}
        </p>
      </div>
      <Carousel className="w-full">
        <CarouselContent className="w-full">
          {eventsMutation.data?.Data.map((event, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-[28%]"
            >
              <EventCard event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
