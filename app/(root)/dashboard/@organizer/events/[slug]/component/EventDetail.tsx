import { Event } from "@/lib/api/event";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  TicketIcon,
  PackageIcon,
  SettingsIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventTicket from "./EventTicket";
import EventProducts from "./EventProduct";
import EventSetting from "@/app/(root)/dashboard/@organizer/events/[slug]/component/EventSetting";
import EventStaff from "@/app/(root)/dashboard/@organizer/events/[slug]/component/EventStaff";
import EventPost from "@/app/(root)/dashboard/@organizer/events/[slug]/component/EventPost";

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const event = (await Event.getById(params.slug)).data;

  if (!event) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <h2 className="text-2xl font-semibold">Event not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 px-4">
      {event.isDeleted && (
        <Badge variant="destructive" className="mb-4">
          Event has been disabled
        </Badge>
      )}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="border-none bg-transparent">
            <CardContent className="p-6">
              <Image
                width={400}
                height={400}
                alt={event.name}
                src={event.thumbnailUrl}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={event.user.imageUrl} />
                    <AvatarFallback>
                      {event.user.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Hosted by</p>
                    <p className="font-medium">{event.user.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm">
                      {format(event.eventStartDate, "PPP")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(event.eventStartDate, "p")} -{" "}
                      {format(event.eventEndDate, "p")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* <MapPinIcon className="h-5 w-5 text-muted-foreground" /> */}
                  <p className="text-sm">{event.location.display}</p>
                </div>
                <div>
                  <EventSetting event={event} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="border-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 lg:grid-cols-7">
                  <TabsTrigger value="overview" className="">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="guests">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Guests
                  </TabsTrigger>
                  {/* <TabsTrigger value="registration">Registration</TabsTrigger> */}
                  <TabsTrigger value="products">
                    <PackageIcon className="mr-2 h-4 w-4" />
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="tickets">
                    <TicketIcon className="mr-2 h-4 w-4" />
                    Tickets
                  </TabsTrigger>
                  <TabsTrigger value="staff">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Staff
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="posts">
                    <StarIcon className="mr-2 h-4 w-4" />
                    Posts
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div className="rounded-lg bg-white/5 p-4">
                      <h3 className="mb-2 font-semibold">About Event</h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      ></div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="guests" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Guest List</h3>
                    {/* Add guest list component here */}
                    <p className="text-muted-foreground">
                      No guests registered yet.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="registration" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Registration Details
                    </h3>
                    {/* Add registration details component here */}
                    <p className="text-muted-foreground">
                      Registration information not available.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="products" className="mt-6">
                  <EventProducts eventId={event.id} />
                </TabsContent>
                <TabsContent value="tickets" className="mt-6">
                  <EventTicket eventId={event.id} />
                </TabsContent>
                <TabsContent value="staff" className="mt-6">
                  <EventStaff eventId={event.id} />
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                  <EventSetting event={event} />
                </TabsContent>
                <TabsContent value="posts" className="mt-6">
                  <EventPost event={event} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
