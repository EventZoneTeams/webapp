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
import useNotification from "@/hooks/useNotification";
import { formatDistanceToNow } from "date-fns";
import useAuth from "@/hooks/useAuth";


export default function NotificationMenu() {

  const {notifications, refetch} = useNotification();
  const {authUser} = useAuth();
  console.log(authUser)

  console.log(notifications);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl("https://localhost:7006/notification-hub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection.start()
    .then(() => {
      console.log("Connection started")
      console.log(authUser)
      if(authUser){
        connection.invoke("JoinRoom", authUser.RoleName)
      }
    })
    .catch(() => console.log("Error connecting to SignalR"));

    connection.on("ReceiveNotification", (title, content) => {
      refetch();
      console.log(title, content);
      toast.info(`${title} - ${content}`);
    });

    return () => {
      connection.stop();
    };
  }, [authUser]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="relative">
            <BellIcon />
            <span className="absolute -top-1 right-1 bg-red-500 text-tertiary-foreground  h-6 w-6 items-center justify-center flex rounded-full select-none">
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
              {notifications.map((notification,index:number) => (
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
  //get current domain
  const domain = window.location.origin;
  console.log(domain);
  console.log(notification);
  return (
    <DropdownMenuItem>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{notification.Sender}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{notification.Title}</div>
          <div className="line-clamp-2">
            {notification.Body}
          </div>
          {/* at */}
          <div className="text-xs">
            {formatDistanceToNow(new Date(notification.CreatedAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </DropdownMenuItem>
  );
}
