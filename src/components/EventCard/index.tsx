"use client";

import { getEvent } from "@/api/event";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

export default function EventCard() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEvent,
  });

  return (
    <Card className="w-[350px] flex border-none bg-transparent shadow-none">
      <CardContent className="p-0 w-[350px]">
        <img
          className="w-[350px] h-[160px] object-cover rounded-md"
          src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp"
          alt="test"
        />
        <p className="mt-4 font-semibold text-sm">
          (Hà Nội) Piano solo - David Greilsammer | Du hành cùng Satie
        </p>
        <div className="mt-2 flex">
          <Badge className="mr-2">Category</Badge>
          <Badge variant="secondary">HCM</Badge>
        </div>
        <div className="mt-2 flex items-center text-sm">
          <Calendar size={15} className="mr-2 text-sm" />
          02 Tháng 12, 2024
        </div>
      </CardContent>
    </Card>
  );
}
