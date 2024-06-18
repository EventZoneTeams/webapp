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

export default function EventsLoading() {
  return (
    <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))] border-b-2">
      <div className="flex flex-col gap-4 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <EventLoading key={i} />
        ))}
      </div>
    </ScrollArea>
  );
}

function EventLoading() {
  return (
    <Card className="flex gap-2 h-44 w-full relative animate-pulse">
      <div className="aspect-video h-full">
        <div className="w-full h-full bg-secondary rounded-md flex items-center justify-center animate-pulse"></div>
      </div>
      <div className="flex-1">
        <CardHeader>
          <CardTitle className="line-clamp-1 animate-pulse bg-secondary text-secondary rounded-md">
            Card title
          </CardTitle>
          <CardDescription className="animate-pulse  bg-secondary text-secondary rounded-md">
            Card description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 animate-pulse  bg-secondary text-secondary rounded-md">
            Card content Imagine you’re implementing a beautiful design you or
            someone on your team carefully crafted in Figma. You’ve nailed all
            the different layouts at each breakpoint, perfected the whitespace
            and typography, and the photography you’re using is really bringing
            the design to life. It looks totally amazing — until you connect it
            your actual production content and realize that your beautiful grid
            of blog cards falls apart because, of course, real article excerpts
            aren’t all magically exactly three lines long, and now each card is
            a different height.
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
