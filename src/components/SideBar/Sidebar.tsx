"use client";

import React from "react";
import Link from "next/link";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { SidebarItem } from "@/types/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  parentPath?: string;
  sidebarTitle: string;
  sidebarItems: SidebarItem[];
  isPro?: boolean;
}

export default function Sidebar({
  sidebarItems,
  sidebarTitle,
  isPro,
  parentPath,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href={`${parentPath || ""}`}
            className="flex items-center gap-2 font-semibold"
          >
            <LockKeyhole className="h-6 w-6" />
            <span className="">{sidebarTitle}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.title}
                href={`/dashboard${item.href}` || "#"}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  {
                    "text-primary bg-muted":
                      pathname === `${parentPath}${item.href}`,
                  }
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        {isPro && (
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0" className="bg-muted/80">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
