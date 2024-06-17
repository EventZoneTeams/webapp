"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { MessageSquareMore, MessageSquareText } from "lucide-react";
import PendingEvents from "@/app/dashboard/@manager/feedback/components/PendingEvents";
import FilterBar from "@/app/dashboard/@manager/feedback/components/FilterBar";
import IsFeedbackEvents from "@/app/dashboard/@manager/feedback/components/IsFeedbackEvents";

type tabs = "pending" | "isFeedback";

export default function page() {
  const searchParams = useSearchParams();
  const tabsEnum = ["pending", "isFeedback"];
  const tab = searchParams.get("tab");
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleTabChange = (tab: tabs) => {
    const params = new URLSearchParams({
      tab,
    });
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
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
            <PendingEvents />
          </TabsContent>
          <TabsContent value="isFeedback" className="w-full">
            <IsFeedbackEvents />
          </TabsContent>
        </Tabs>
      </div>
      <div>Hi</div>
    </div>
  );
}
