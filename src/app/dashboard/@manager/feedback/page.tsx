"use client";

import React, { use, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MessageSquareMore, MessageSquareText } from "lucide-react";
import FilterBar from "@/app/dashboard/@manager/feedback/components/FilterBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Paging from "@/app/dashboard/@manager/feedback/components/Paging";
import EventList from "@/app/dashboard/@manager/feedback/components/EventList";
import { useFilterAndPaging } from "@/stores/manager/filter-paging";

type tabs = "pending" | "isFeedback";
const tabsEnum = ["pending", "isFeedback"];

export default function page() {
  const searchParams = useSearchParams();
  const { setQueryObj, queryObj } = useFilterAndPaging();
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
      setQueryObj({
        ...queryObj,
        status: tab === "pending" ? "PENDING" : "ISFEEDBACK",
      });
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
          <div className="flex items-center justify-between gap-4 relative">
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
            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2">
              <Paging />
            </div>
            <FilterBar />
          </div>

          <TabsContent value="pending" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="isFeedback" className="w-full">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.64))] border-y-2">
              <EventList />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
