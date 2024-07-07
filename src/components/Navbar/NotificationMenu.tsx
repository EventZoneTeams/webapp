"use client";

import { BellIcon, LifeBuoy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const ExampleNotifications: Notification[] = [
  {
    Title: "New Event Created",
    Body: "A new event has been created",
    UserId: 1,
    IsRead: false,
    Url: "/events/1",
    Sender: "System",
  },
  {
    Title: "New Event Created",
    Body: "A new event has been created",
    UserId: 1,
    IsRead: false,
    Url: "/events/1",
    Sender: "System",
  },
  {
    Title: "New Event Created",
    Body: "A new event has been created",
    UserId: 1,
    IsRead: false,
    Url: "/events/1",
    Sender: "System",
  },
  {
    Title: "New Event Created",
    Body: "A new event has been created",
    UserId: 1,
    IsRead: false,
    Url: "/events/1",
    Sender: "System",
  },
  {
    Title: "New Event Created",
    Body: "A new event has been created",
    UserId: 1,
    IsRead: false,
    Url: "/events/1",
    Sender: "System",
  },
];

export default function NotificationMenu() {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl("https://ez-api.azurewebsites.net/notification-hub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection.start().catch(() => toast.error("Failed to connect to SignalR"));

    connection.on("ReceiveNotification", (title, content) => {
      toast.info(`${title} - ${content}`);
    });
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="relative">
            <BellIcon />
            <span className="absolute -top-1 right-1 bg-tertiary text-tertiary-foreground  h-6 w-6 items-center justify-center flex rounded-full select-none">
              5
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-96 shadow-2xl mr-6 mt-2"
          side="bottom"
          align="start"
        >
          <DropdownMenuLabel className="text-orange-500">
            <Badge>Notification</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {ExampleNotifications.map((notification, index) => (
                <NotificationItem key={index} notification={notification} />
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// var newNotification = new Notification
// {
//     Title = notification.Title,
//     Body = notification.Body,
//     UserId = notification.UserId,
//     IsRead = false,
//     Url = notification.Url,
//     Sender = notification.Sender ?? "System"
// };

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <DropdownMenuItem>
      <div className="flex items-start gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{notification.Title}</div>
          <div className="line-clamp-2">
            {notification.Body}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            repellendus, vitae ad illum nemo dicta quam architecto molestias.
            Dolore beatae ullam est qui nam earum repudiandae veritatis quae.
            Veritatis, odit.
          </div>
        </div>
      </div>
    </DropdownMenuItem>
  );
}
