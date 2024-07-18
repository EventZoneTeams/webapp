"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MessageSquareMore, MessageSquareText } from "lucide-react";
import FilterBar from "@/app/dashboard/@manager/feedback/components/FilterBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Paging from "@/app/dashboard/@manager/feedback/components/Paging";
import EventList from "@/components/Event/EventList";
import useEvent from "@/hooks/useEvent";
import { GetEventSendData } from "@/api/event";

type tabs = "pending" | "approved" | "rejected" | "all";
const tabsEnum = ["pending", "approved", "rejected", "all"];

export default function page() {
  const searchParams = useSearchParams();
  const { setQueryObj, queryObj } = useEvent();
  const tab = searchParams.get("tab") ?? "pending";
  const pageNumberParam = searchParams.get("page-number") ?? 1;
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleTabChange = (tab: tabs) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    replace(`${pathName}?${params.toString()}`);
  };

  useEffect(() => {
    let updatedQueryObj: GetEventSendData;
    if (tab) {
      switch (tab) {
        case "pending":
          updatedQueryObj = {
            ...queryObj,
            status: "PENDING",
          };
          setQueryObj(updatedQueryObj);
          break;
        case "approved":
          updatedQueryObj = {
            ...queryObj,
            status: "APPROVED",
          };
          setQueryObj(updatedQueryObj);
          break;
        case "rejected":
          updatedQueryObj = {
            ...queryObj,
            status: "REJECTED",
          };
          setQueryObj(updatedQueryObj);
          break;
        case "all":
          updatedQueryObj = {
            ...queryObj,
            status: undefined,
          };
          setQueryObj(updatedQueryObj);
          break;
        default:
          updatedQueryObj = {
            ...queryObj,
            status: "PENDING",
          };
          setQueryObj(updatedQueryObj);
      }
    } else {
      updatedQueryObj = {
        ...queryObj,
        status: undefined,
      };
      setQueryObj(updatedQueryObj);
    }
  }, [tab]);

  useEffect(() => {
    let updatedQueryObj: GetEventSendData;
    if (pageNumberParam) {
      updatedQueryObj = {
        ...queryObj,
        "page-number": Number(pageNumberParam),
      };
      setQueryObj(updatedQueryObj);
    } else {
      updatedQueryObj = {
        ...queryObj,
        "page-number": 1,
      };
      setQueryObj(updatedQueryObj);
    }
  }, [pageNumberParam]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Tabs
          defaultValue={
            tab
              ? tabsEnum.includes(tab as tabs)
                ? (tab as tabs)
                : "all"
              : "all"
          }
          className="w-full"
        >
          <div className="flex items-center justify-between gap-4 relative my-2">
            <TabsList>
              <TabsTrigger
                value="all"
                onClick={() => {
                  handleTabChange("all");
                }}
                className="flex items-center gap-1"
              >
                <MessageSquareMore size={18} />
                All
              </TabsTrigger>
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
                value="approved"
                onClick={() => {
                  handleTabChange("approved");
                }}
                className="flex items-center gap-1"
              >
                <MessageSquareText size={18} />
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                onClick={() => {
                  handleTabChange("rejected");
                }}
                className="flex items-center gap-1"
              >
                <MessageSquareText size={18} />
                Rejected
              </TabsTrigger>
            </TabsList>
            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2">
              <Paging />
            </div>
            <FilterBar />
          </div>
          <TabsContent value="all" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.40)_-_0.5rem)] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="pending" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.40)_-_0.5rem)] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="approved" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.40)_-_0.5rem)] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="rejected" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.40)_-_0.5rem)] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
