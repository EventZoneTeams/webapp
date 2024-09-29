"use client ";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Tab = {
  label: string;
  href: string;
};

const tabs: Tab[] = [
  // { label: "Profile", href: "/account/profile" },
  { label: "Wallet", href: "/account/wallet" },
  // { label: "Orders", href: "/account/orders" },
];

export default function ProfileTabs() {
  const pathname = usePathname();
  return (
    <div className="flex h-16 w-full gap-4 border-t">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex h-full w-32 items-center justify-center ${
            tab.href === pathname ? "border-tertiary border-b-2" : ""
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
