"use client ";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Tab = {
  label: string;
  href: string;
};

const tabs: Tab[] = [
  { label: "Account", href: "/profile/me" },
  { label: "Wallet", href: "/profile/wallet" },
];

export default function ProfileTabs() {
  const pathname = usePathname();
  return (
    <div className="w-full h-16  flex gap-4 border-t ">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex items-center justify-center h-full w-32 ${
            tab.href === pathname ? "border-b-2 border-tertiary" : ""
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
