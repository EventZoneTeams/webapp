"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MessageSquareMore, MessageSquareText } from "lucide-react";
import FilterBar from "@/app/dashboard/@manager/feedback/components/FilterBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Paging from "@/app/dashboard/@manager/feedback/components/Paging";
import EventList from "@/app/dashboard/@manager/feedback/components/EventList";
import useEvent from "@/hooks/useEvent";

type tabs = "pending" | "approved" | "rejected";
const tabsEnum = ["pending", "approved", "rejected"];

export default function page() {
  const searchParams = useSearchParams();
  const { setQueryObj, queryObj } = useEvent();
  const tab = searchParams.get("tab");
  const pageNumberParam = searchParams.get("page-number");
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleTabChange = (tab: tabs) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    replace(`${pathName}?${params.toString()}`);
  };
  useEffect(() => {
    if (tab) {
      switch (tab) {
        case "pending":
          setQueryObj({
            ...queryObj,
            status: "PENDING",
          });
          break;
        case "approved":
          setQueryObj({
            ...queryObj,
            status: "APPROVED",
          });
          break;
        case "rejected":
          setQueryObj({
            ...queryObj,
            status: "REJECTED",
          });
          break;
        default:
          setQueryObj({
            ...queryObj,
            status: "PENDING",
          });
      }
    } else {
      setQueryObj({
        ...queryObj,
        status: "PENDING",
      });
    }
  }, [tab]);

  useEffect(() => {
    if (pageNumberParam) {
      setQueryObj({
        ...queryObj,
        "page-number": Number(pageNumberParam),
      });
    } else {
      setQueryObj({
        ...queryObj,
        "page-number": 1,
      });
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
                : "pending"
              : "pending"
          }
          className="w-full"
        >
          <div className="flex items-center justify-between gap-4 relative my-2">
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

          <TabsContent value="pending" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.42))] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="approved" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.42))] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="rejected" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.42))] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
