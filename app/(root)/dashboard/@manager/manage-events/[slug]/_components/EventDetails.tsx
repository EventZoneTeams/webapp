"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/api/event";
import { FeedBack } from "@/lib/api/feedback";
import { Event as EventType } from "@/types/event";
import { format } from "date-fns";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function EventDetails(props: { slug: string }) {
  const [event, setEvent] = React.useState<EventType | null>(null);
  const [isLoading, startTransition] = React.useTransition();
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      Event.getById(props.slug).then((response) => {
        if (response.isSuccess) {
          setEvent(response.data);
        }
      });
    });
  }, []);

  const handleApprove = async () => {
    FeedBack.feedback({
      eventId: event?.id!,
      content: "Event approved",
      feedbackOption: 1,
    }).then((response) => {
      if (response.isSuccess) {
        toast.success("Event approved");
        router.push("/dashboard/manage-events");
      } else {
        toast.error("Failed to approve event");
      }
    });
  };

  const handleReject = async () => {
    FeedBack.feedback({
      eventId: event?.id!,
      content: "Event rejected",
      feedbackOption: 0,
    }).then((response) => {
      if (response.isSuccess) {
        toast.success("Event rejected");
        router.push("/dashboard/manage-events");
      } else {
        toast.error("Failed to reject event");
      }
    });
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : event ? (
    <div className="my-6 flex w-full gap-6">
      <div className="space-y-4">
        <Image
          width={400}
          height={400}
          alt={event?.name!}
          src={event?.thumbnailUrl!}
          className="aspect-square size-[400px] rounded-xl object-cover"
        />

        <div className="space-y-2">
          <p>
            <span className="text-sm text-primary/50">Hosted by</span>
          </p>
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={event?.user.imageUrl!} />
              <AvatarFallback>
                {event?.user.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-semibold text-primary">
              {event?.user.fullName}
            </span>
          </div>
        </div>
      </div>

      <div className="w-1/2 space-y-6">
        <h1 className="text-3xl font-bold">{event?.name}</h1>

        <div className="rounded-xl bg-background/50 backdrop-blur-xl">
          <p className="w-full rounded-t-xl bg-background/50 p-2 text-center">
            Time
          </p>
          <div className="flex gap-4 p-4">
            <div className="flex-1 space-y-2">
              <p className="text-sm text-primary/50">From</p>
              <p className="text-3xl font-semibold">
                {format(event?.eventStartDate!, "pp")}
              </p>
              <p className="text-sm text-primary/50">
                {format(event?.eventEndDate!, "PP")}
              </p>
            </div>

            <div className="h-full w-[1px] bg-primary/50"></div>

            <div className="flex-1 space-y-2">
              <p className="text-sm text-primary/50">To</p>
              <p className="text-3xl font-semibold">
                {format(event?.eventEndDate!, "pp")}
              </p>
              <p className="text-sm text-primary/50">
                {format(event?.eventEndDate!, "PP")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-background/50 backdrop-blur-xl">
          <p className="w-full rounded-t-xl bg-background/50 p-2 text-center">
            Address
          </p>
          <div className="flex gap-4 p-4">
            <div className="flex flex-1 items-center gap-2">
              <MapPinIcon size={20} className="text-primary/50" />
              <p className="text-base font-normal">{event?.location.display}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="border-b-[1px] border-primary/20 pb-2 text-sm font-semibold text-primary/50">
            About Event
          </p>
          <div dangerouslySetInnerHTML={{ __html: event?.description! }}></div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <p>Create at:</p>
            <p>{format(event?.createdAt!, "PPpp")}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="w-full" variant={"outline"} onClick={handleReject}>
            Reject
          </Button>
          <Button className="w-full" onClick={handleApprove}>
            Approved
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
