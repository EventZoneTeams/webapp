"use client";

import React, { useEffect } from "react";
import { IoIosSchool } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { Event } from "@/types/event";
import useEvent from "@/hooks/useEvent";
import { format } from "date-fns";
import Image from "next/image";

export default function page() {
  const { authUser } = useAuth();
  const { eventsMutation, setQueryObj, queryObj } = useEvent();

  useEffect(() => {
    if (authUser) {
      setQueryObj({
        UserId: authUser.Id,
      });
    }
  }, [authUser]);

  useEffect(() => {
    eventsMutation.mutate(queryObj);
  }, [queryObj]);
  return (
    <div className="bg-background grid grid-cols-5 gap-4 pb-5">
      <div className="h-40 col-span-2 rounded-md p-2 flex flex-col gap-2 divide-y divide-border mt-4">
        <div className="flex items-center gap-2">
          <IoIosSchool size={30} className="text-secondary" />
          <span className="">
            {authUser ? authUser?.University : "Full Name"}
          </span>
        </div>
        {/* <div className="flex items-center gap-2 py-1">
          <FaCalendar size={28} className="text-secondary" />
          <span className="">23/12/2003</span>
        </div> */}
      </div>
      <div className="col-span-3 rounded-md">
        {eventsMutation.isPending ? (
          <div>Loading...</div>
        ) : eventsMutation.data?.Data.length === 0 ? (
          <div>No Event Found</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {eventsMutation.data?.Data.map((event, index) => (
              <div key={index}>
                <Post {...event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Post = (event: Event) => {
  return (
    <div className="flex gap-4 p-2 h-40">
      <div className="">
        {event.ThumbnailUrl ? (
          <Image
            src={event.ThumbnailUrl}
            alt="Event Image"
            width={1600}
            height={900}
            className="rounded-md object-cover aspect-video h-full"
          />
        ) : (
          <div className="h-full aspect-video bg-secondary rounded-md animate-pulse"></div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="text-lg font-semibold flex items-center gap-2">
            {event.Name}
            {event.IsDonation ? (
              <Badge className="bg-green-100 text-green-800">Donation</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">No Donation</Badge>
            )}
          </div>
          <div className="text-sm italic text-gray-500">
            {format(event.EventStartDate, "P")} -{" "}
            {format(event.EventEndDate, "P")}
          </div>
          <div className="line-clamp-2 text-gray-500 text-sm">
            {event.Description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consectetur rerum amet ratione voluptatibus
            dolores saepe quod recusandae reprehenderit sed? Ut dolore nemo
            voluptates excepturi voluptate dicta fugit assumenda magni
            explicabo.
          </div>
        </div>
        {event.IsDonation ? (
          <div>
            <Progress
              value={33}
              max={100}
              className={cn("h-2", "bg-secondary", "rounded-md")}
              indicatorColor="bg-gradient-to-r from-primary to-tertiary"
            />
          </div>
        ) : (
          <div>
            <Progress
              value={100}
              max={100}
              className={cn("h-2", "bg-secondary", "rounded-md")}
              indicatorColor="bg-gradient-to-r from-primary to-tertiary"
            />
          </div>
        )}
      </div>
    </div>
  );
};
