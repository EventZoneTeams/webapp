"use client";

import NotificationMenu from "@/components/Navbar/NotificationMenu";
import { UserMenu } from "@/components/Navbar/UserMenu";
import { usePathname } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function DashboardHeader() {
  const [pageTitle, setPageTitle] = useState<string>("");
  const pathname = usePathname();
  useEffect(() => {
    setPageTitle(document.title);
  }, [pathname]);
  return (
    <div className="h-14 px-4 first-letter flex items-center justify-between w-full bg-background border-b">
      <div className=" text-lg font-semibold flex items-center">
        <p>{pageTitle}</p>
      </div>
      <div className="flex gap-4 items-center">
        <NotificationMenu />
        <UserMenu />
      </div>
    </div>
  );
}
