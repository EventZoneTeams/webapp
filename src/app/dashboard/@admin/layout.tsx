import React from "react";
import { Home, Package, Users } from "lucide-react";
import Sidebar from "@/components/SideBar/Sidebar";
import { MyBreadcrumb } from "@/components/Breadcrumb";
import PrivateProvider from "@/providers/PrivateProvider";
import { SidebarItem } from "@/types/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarProvider from "@/providers/SidebarProvider";
import DashboardHeader from "@/components/DashboardHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Event Categories",
    href: "/dashboard/event-categories",
    icon: <Package className="h-4 w-4" />,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <SidebarProvider sidebarItems={sidebarItems}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
          <Sidebar sidebarTitle="Organizer dashboard" />
          <div className="flex flex-col">
            <div className="w-full">
              <DashboardHeader />
            </div>
            <div className="h-14 gap-4 px-4 flex items-center border-b">
              <MyBreadcrumb />
            </div>
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.28))] ">
              <main className="flex flex-col gap-4 px-4 lg:gap-6 lg:px-4 h-full ">
                {children}
              </main>
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </PrivateProvider>
  );
}
