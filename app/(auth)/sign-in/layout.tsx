import React from "react";

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { ArrowLeftIcon, ChevronsLeftIcon, UserPlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[500px]">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/system-design" className={cn("text-base font-normal")}>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 backdrop-blur-sm"
          >
            <ArrowLeftIcon size={20} />
            Home
          </Button>
        </Link>
        <Link href="/sign-up" className={cn("text-base font-normal")}>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 backdrop-blur-sm"
          >
            <UserPlusIcon size={20} />
            Sign Up
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
