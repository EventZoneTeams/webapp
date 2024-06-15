"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams({
      tab,
    });
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div>
      <Tabs defaultValue={tab ? tab : "pending"} className="w-full">
        <TabsList>
          <TabsTrigger
            value="pending"
            onClick={() => {
              handleTabChange("pending");
            }}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="isFeedback"
            onClick={() => {
              handleTabChange("isFeedback");
            }}
          >
            Is Feedback
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="bg-red-500 w-full">
          Make changes to your pending here.
        </TabsContent>
        <TabsContent value="isFeedback" className="bg-red-500 w-full">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
