import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, UserPlusIcon } from "lucide-react";
import type { Metadata } from "next";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center border px-6 backdrop-blur-lg">
      <div>
        {/* <div className="mb-4 flex items-center justify-between">
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
        </div> */}
        {children}
      </div>
    </div>
  );
}
