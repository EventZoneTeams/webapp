import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function EventsLoading() {
  return (
    <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))] border-b-2">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventLoading key={i} />
        ))}
      </div>
    </ScrollArea>
  );
}

function EventLoading() {
  return (
    <Card className="w-full bg-transparent hover:ring hover:cursor-pointer">
      <div className="aspect-video w-full bg-secondary animate-pulse"></div>
      <CardContent className=" w-full">
        <p className="mt-4 font-semibold text-sm line-clamp-1 text-secondary bg-secondary rounded-md animate-pulse">
          Loading...
        </p>
        <div className="mt-2 flex gap-2">
          <Badge variant={"secondary"} className="text-secondary animate-pulse">
            Loading...
          </Badge>
          <Badge variant={"secondary"} className="text-secondary animate-pulse">
            Loading...
          </Badge>
          <Badge variant={"secondary"} className="text-secondary animate-pulse">
            Loading...
          </Badge>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className=" text-sm text-secondary bg-secondary rounded-md animate-pulse flex-1">
            Loading...
          </div>
          <div className=" text-sm text-secondary bg-secondary rounded-md animate-pulse flex-1">
            Loading...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
