import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Tab {
  label: string;
  href: string;
}

const tabs: Tab[] = [
  { label: "Wallet", href: "/account/wallet" },
  { label: "Orders", href: "/account/orders" },
];

export default function Tabs() {
  const pathname = usePathname();
  return (
    <ShadcnTabs defaultValue={pathname}>
      <TabsList className="bg-primary/5">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.href} value={tab.href} className="w-24 rounded">
            <Link href={tab.href}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </ShadcnTabs>
  );
}
