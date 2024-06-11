"use client";

import { getEventCategories } from "@/api/event-categories";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";

export default function HomeCarousel() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
  });

  return (
    <div className="flex justify-center">
      <Carousel>
        <CarouselContent className="w-[1000px] h-[400px]">
          {data?.data?.map((event, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="flex justify-center items-center">
                  <CardContent className="flex aspect-square items-center justify-center p-0 w-[1000px] h-[400px]">
                    <img
                      className="w-full h-full object-cover"
                      src={event["image-url"]}
                      alt={event.title}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
