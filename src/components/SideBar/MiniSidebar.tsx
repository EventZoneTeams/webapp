"use client";

import { cn } from "@/lib/utils";
import { SidebarItem } from "@/types/sidebar";
import { Home, Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const MiniSidebarItem: SidebarItem[] = [
  {
    title: "Details",
    href: "",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Packages",
    href: "/packages",
    icon: <Package className="h-4 w-4" />,
  },
];

export default function MiniSidebar({ id }: { id: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = `/dashboard/my-events/${id}`;
  return (
    <div className="">
      <div className="flex flex-col">
        {MiniSidebarItem.map((item, index) => (
          <Link
            key={index}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary rounded-md cursor-pointer",
              pathname === `${baseUrl}${item.href}` &&
                "bg-secondary text-primary"
            )}
            href={`${baseUrl}${item.href}`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
