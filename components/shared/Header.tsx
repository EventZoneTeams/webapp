"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "System Design",
    href: "/system-design",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  return (
    <div className="sticky left-0 right-0 top-0 z-50 h-16 border-b backdrop-blur-md">
      <div className="container flex h-full items-center">
        <ul className="flex h-full flex-1 items-center gap-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex h-full items-center">
              <Link
                href={item.href}
                className={cn(
                  "flex h-full items-center px-4 py-2",
                  pathname === item.href
                    ? "h-full border-b-2 border-primary text-primary"
                    : "hover:bg-gray-100",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {user ? (
          <div className="">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>
                {user?.fullName
                  ?.split(" ")
                  .map((name) => name[0].toUpperCase())}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href={"/sign-in"}>
              <p className="block py-2">Login</p>
            </Link>
            <Link href={"/sign-up"}>
              <p className="block py-2">Register</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
