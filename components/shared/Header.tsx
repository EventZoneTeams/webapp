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
    name: "Discover",
    href: "/discover",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-12 backdrop-blur-3xl">
      <div className="flex h-full items-center justify-between px-10">
        <Link href={"/"} className="flex items-center">
          <p className="text-2xl font-bold">EventZone</p>
        </Link>

        <ul className="absolute left-1/2 flex h-full flex-1 -translate-x-1/2 items-center justify-center gap-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex h-full items-center">
              <Link
                href={item.href}
                className={cn(
                  "flex h-full items-center px-4 py-2 text-nav-text-secondary",
                  pathname === item.href
                    ? "h-full border-b-2 border-primary text-nav-text"
                    : "hover:text-nav-text",
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
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.fullName[0].toUpperCase()}</AvatarFallback>
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
