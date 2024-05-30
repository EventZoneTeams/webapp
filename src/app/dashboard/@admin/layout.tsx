import React from "react";
import { Home, Package, Users } from "lucide-react";
import Sidebar from "@/components/SideBar/Sidebar";
import { MyBreadcrumb } from "@/components/Breadcrumb";
import PrivateProvider from "@/providers/privateProvider";
import { SidebarItem } from "@/types/sidebar";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Event Categories",
    href: "/event-categories",
    icon: <Package className="h-4 w-4" />,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <div className="grid min-h-[calc(100vh_-_theme(spacing.20))] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar sidebarItems={sidebarItems} sidebarTitle="Admin dashboard" />
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <MyBreadcrumb />
            {children}
          </main>
        </div>
      </div>
    </PrivateProvider>
  );
}
