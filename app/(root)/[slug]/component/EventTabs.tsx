import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "./PostCard";
import EventProducts from "./EventProduct";
import { Event } from "@/types/event";
import { EventProduct } from "@/types/event-product";
import { format } from "date-fns";
import { MapPinIcon } from "lucide-react";
import EventLocation from "./EventLocation";
import GetTicket from "./GetTicket";
export default function EventTabs({
  event,
}: {
  event: Event;
}) {
  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="posts">
        <TabsList className="rounded-md bg-background/50 p-2 text-gray-300">
          <TabsTrigger value="posts" className="text-white">
            Posts
          </TabsTrigger>
          <TabsTrigger value="products" className="text-white">
            Products
          </TabsTrigger>
          <TabsTrigger value="other" className="text-white">
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="space-y-6">
            <PostCard eventId={event.id} />
          </div>
        </TabsContent>

        <TabsContent value="products">
          <EventProducts eventId={event.id} />
        </TabsContent>

        <TabsContent value="other">
          <div className="space-y-6">
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
                    {format(event?.eventStartDate!, "PP")}
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
                  <p className="text-base font-normal">
                    {event?.location.display}
                  </p>
                </div>
              </div>
              <div className="aspect-video w-full rounded-xl">
                <EventLocation
                  eventImage={event.thumbnailUrl}
                  placeId={event.location.placeId}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
