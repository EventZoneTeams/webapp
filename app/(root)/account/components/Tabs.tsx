import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tabs as ShadcnTabs,
  TabsContent,
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
  { label: "Tickets", href: "/account/tickets" },
];

export default function Tabs() {
  const pathname = usePathname();
  return (
    <ShadcnTabs defaultValue={pathname}>
      <TabsList className="bg-primary/5">
        {tabs.map((tab) => (
          <Link href={tab.href} key={tab.href}>
            <TabsTrigger value={tab.href} className="w-24 rounded">
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </ShadcnTabs>
  );
}
