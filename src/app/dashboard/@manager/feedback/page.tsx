"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MessageSquareMore, MessageSquareText } from "lucide-react";
import PendingEvents from "@/app/dashboard/@manager/feedback/components/PendingEvents";
import FilterBar from "@/app/dashboard/@manager/feedback/components/FilterBar";
import IsFeedbackEvents from "@/app/dashboard/@manager/feedback/components/IsFeedbackEvents";
import CurrentEvent from "@/app/dashboard/@manager/feedback/components/CurrentEvent";
import { useMutation } from "@tanstack/react-query";
import { getEventById } from "@/api/event";
import { useCurrentEvent } from "@/stores/manager/current-event";
import { ScrollArea } from "@/components/ui/scroll-area";

type tabs = "pending" | "isFeedback";

export default function page() {
  const searchParams = useSearchParams();
  const tabsEnum = ["pending", "isFeedback"];
  const tab = searchParams.get("tab");
  const eventId = searchParams.get("event");
  const pathName = usePathname();
  const { replace } = useRouter();
  const { setCurrentEvent, reset } = useCurrentEvent();

  const handleTabChange = (tab: tabs) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    replace(`${pathName}?${params.toString()}`);
  };

  const getEventByIdMutation = useMutation({
    mutationFn: (eventId: number) => getEventById(eventId),
    onSuccess: (data) => {
      setCurrentEvent(data.data);
    },
    onError: (error) => {
      reset();
    },
  });

  useEffect(() => {
    if (eventId) {
      getEventByIdMutation.mutate(parseInt(eventId));
    }
  }, [eventId]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Tabs
          defaultValue={
            tab
              ? tabsEnum.includes(tab as tabs)
                ? (tab as tabs)
                : "pending"
              : "pending"
          }
          className="w-full"
        >
          <div className="flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger
                value="pending"
                onClick={() => {
                  handleTabChange("pending");
                }}
                className="flex items-center gap-1"
              >
                <MessageSquareMore size={18} />
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="isFeedback"
                onClick={() => {
                  handleTabChange("isFeedback");
                }}
                className="flex items-center gap-1"
              >
                <MessageSquareText size={18} />
                Is Feedback
              </TabsTrigger>
            </TabsList>
            <FilterBar />
          </div>

          <TabsContent value="pending" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))] border-b-2">
              <PendingEvents />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="isFeedback" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))] border-b-2">
              <IsFeedbackEvents />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
