import { Event } from "@/types/event";
import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Captions,
  CheckCheck,
  CircleDollarSign,
  CircleHelp,
  Clock,
  Coins,
  GraduationCap,
  Layers3,
  List,
  MapPin,
  NotebookPen,
  WalletMinimal,
} from "lucide-react";
import EventImage from "@/components/EventImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function EventDetails({ event }: { event: Event }) {
  console.log(event);
  return (
    <div className="">
      <EventImage src={event.ThumbnailUrl ?? ""} />
      <div className="flow-root mt-4">
        <dl className="-my-3 divide-y divide-border text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <Captions size={18} />
              Title
            </dt>
            <dd className="text-primary sm:col-span-2">{event.Name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <Clock size={18} />
              Time
            </dt>
            <dd className="text-primary sm:col-span-2">
              {format(event.EventStartDate, "Pp")} -{" "}
              {format(event.EventEndDate, "Pp")}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <Layers3 size={18} />
              Category
            </dt>
            <dd className="text-primary sm:col-span-2 flex relative">
              {event.EventCategory.Title}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <MapPin size={18} />
              Location
            </dt>
            <dd className="text-primary sm:col-span-2">{event.Location}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <GraduationCap size={18} />
              University
            </dt>
            <dd className="text-primary sm:col-span-2">{event.University}</dd>
          </div>

          {event.EventCampaigns.length > 0 && (
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-primary flex items-center gap-2">
                <Coins size={18} />
                Donation Campaign
              </dt>
              <dd className="text-primary sm:col-span-2 divide-border divide-y ">
                <p className="py-3 flex items-center gap-4">
                  <span className="font-bold">Donation Title: </span>
                  {event.EventCampaigns[0].name}
                </p>
                <p className="py-3">
                  {event.EventCampaigns[0].description} Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Culpa itaque ratione
                  aspernatur iusto quam esse excepturi exercitationem officia
                  laboriosam officiis necessitatibus, fugit illum minus commodi
                  hic harum maxime dicta adipisci?
                </p>
                <p className="py-3">
                  <span className="font-semibold">Target:</span>{" "}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(event.EventCampaigns[0].goalAmount)}
                </p>
                <p className="py-3 flex items-center gap-2">
                  <span className="font-semibold">Donation Time:</span>
                  <div className="flex items-center gap-4">
                    <span>
                      {format(event.EventCampaigns[0].startDate, "Pp")}
                    </span>
                    <span>-</span>
                    <span>{format(event.EventCampaigns[0].endDate, "Pp")}</span>
                  </div>
                </p>
              </dd>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <CircleHelp size={18} />
              Status
            </dt>
            <dd className="text-primary sm:col-span-2">
              <Badge variant={"default"}>{event.Status}</Badge>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-start gap-2">
              <List size={18} />
              Description
            </dt>
            <dd className="text-primary sm:col-span-2">
              {event.Description} Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Minima aliquid fuga deserunt cumque, accusantium
              reiciendis consectetur sed ratione quasi aut ea illum distinctio
              repudiandae molestias asperiores aspernatur labore. Beatae,
              repellat.
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-primary flex items-center gap-2">
              <NotebookPen size={18} />
              Note
            </dt>
            <dd className="text-primary sm:col-span-2">{event.Note}</dd>
          </div>

          <div className="flex justify-between items-end gap-2 py-3 ">
            <dt className="font-medium text-primary flex items-center gap-2">
              <div className="rounded-lg flex items-center gap-2  px-3 py-2 pr-4 bg-muted hover:cursor-pointer hover:bg-muted/80">
                <Avatar className="size-10">
                  <AvatarImage
                    src={event.User?.Image}
                    alt={event.User?.FullName}
                  />
                  <AvatarFallback className="bg-tertiary text-white ">
                    {event.User?.FullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold ">
                    {event.User?.FullName}
                  </span>
                  <span className="text-xs ">{event.User?.Email}</span>
                </div>
              </div>
            </dt>
            <dd className=" sm:col-span-2  h-full text-sm italic">
              {formatDistanceToNow(event.CreatedAt, {
                includeSeconds: true,
              })}{" "}
              ago ({format(event.CreatedAt, "Pp")})
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
