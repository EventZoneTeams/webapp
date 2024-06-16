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
        <TabsContent value="pending" className="bg-red-500 w-full">
          <PendingEvents />
        </TabsContent>
        <TabsContent value="isFeedback" className="bg-red-500 w-full">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
