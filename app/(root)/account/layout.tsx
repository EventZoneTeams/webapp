"use client";

import ProfileTabs from "./components/ProfileTabs";
import Header from "@/components/shared/Header";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/stores/authStore";
import { format } from "date-fns";
import { BadgeCheck, Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <React.Fragment>
      <Header />
      <ScrollArea className="mt-[4.5rem] h-[calc(100vh_-_theme(spacing.24))]">
        <div className="container rounded-md">
          <div className="h-44 w-full">
            {true ? (
              <div className="flex h-44 items-center justify-center rounded-t-md bg-secondary text-gray-400">
                No Image
              </div>
            ) : (
              <Image
                src={
                  "https://th.bing.com/th/id/R.48be1d93cb56533d190ff5c422f8f2cb?rik=BfJWM%2bFjq3YsSA&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fFacebook-Covers-004.jpg&ehk=QyHMcIYCHj1%2bqMrmjGWLcUOKe7Zi8kTKnVJ2G1zuQqA%3d&risl=&pid=ImgRaw&r=0"
                }
                alt="Event Image"
                width={1200}
                height={1200}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>
          <div className="-translate-y-24">
            <div className="flex gap-4 bg-gradient-to-t from-background to-transparent px-10 py-2">
              <div className="border-tertiary size-[150px] rounded-full border-4">
                {user ? (
                  <Image
                    src={user?.imageUrl ?? ""}
                    alt="Event Image"
                    width={100}
                    height={100}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src=""
                    alt="Event Image"
                    width={100}
                    height={100}
                    className="aspect-square h-full w-full animate-pulse rounded-full bg-secondary object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-start">
                <p className="line-clamp-1 flex items-center gap-2 text-2xl font-semibold">
                  {user?.fullName ?? "No Name"}
                  <span>
                    <BadgeCheck className="text-blue-500" />
                  </span>
                </p>
                <div className="text-sm italic">
                  @{user?.roleName ?? "No Unsigned Name"}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center text-sm">
                    <Calendar size={15} className="mr-2 text-sm" />
                    {user && format(user.dob, "P")}
                  </div>
                </div>
                <div className="mt-2">
                  <Badge>{user?.role?.roleName.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
            <div className="container rounded-b-md bg-background px-10">
              <ProfileTabs />
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </React.Fragment>
  );
}
