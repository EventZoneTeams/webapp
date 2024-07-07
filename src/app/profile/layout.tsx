"use client";

import React, { useEffect } from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MyAccount from "@/app/profile/components/MyAccount";
import WalletPage from "@/app/profile/components/WalletPage";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaWallet } from "react-icons/fa";
import { MdAccountCircle, MdVerified } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProfileTabs from "@/app/profile/components/ProfileTabs";

export default function layout({ children }: { children: React.ReactNode }) {
  const { authUser } = useAuth();

  return (
    <React.Fragment>
      <Navbar />
      <ScrollArea className="h-[calc(100vh_-_theme(spacing.24))] ">
        <div className="container rounded-md">
          <div className="w-full h-44">
            {true ? (
              <div className="h-44 bg-secondary text-gray-400 flex items-center justify-center rounded-t-md">
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
                className="rounded-lg w-full h-full object-cover"
              />
            )}
          </div>
          <div className="-translate-y-24">
            <div className="flex gap-4 px-10 py-2 bg-gradient-to-t from-background to-transparent">
              <div className="border-4 rounded-full border-tertiary size-[150px]">
                {authUser ? (
                  <Image
                    src={authUser?.Image ?? ""}
                    alt="Event Image"
                    width={100}
                    height={100}
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src=""
                    alt="Event Image"
                    width={100}
                    height={100}
                    className="rounded-full w-full h-full object-cover aspect-square bg-secondary animate-pulse"
                  />
                )}
              </div>
              <div className="flex flex-col justify-start">
                <p className="font-semibold text-2xl line-clamp-1 flex items-center gap-2">
                  {authUser?.FullName ?? "No Name"}
                  <span>
                    <MdVerified className="text-blue-500" />
                  </span>
                </p>
                <div className="text-sm italic">
                  @{authUser?.UnsignFullName ?? "No Unsigned Name"}
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center text-sm">
                    <Calendar size={15} className="mr-2 text-sm" />
                    {authUser && format(authUser.Dob, "P")}
                  </div>
                </div>
                <div className="mt-2">
                  <Badge>{authUser?.RoleName.toUpperCase()}</Badge>
                </div>
              </div>
            </div>
            <div className="px-10 bg-background rounded-b-md container">
              <ProfileTabs />
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </React.Fragment>
  );
}
