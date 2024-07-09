import { MyBreadcrumb } from "@/components/Breadcrumb";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/SideBar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrivateProvider from "@/providers/PrivateProvider";
import SidebarProvider from "@/providers/SidebarProvider";
import { SidebarItem } from "@/types/sidebar";
import {
  Home,
  Package,
  SquarePlus,
  Users,
  MessageSquareQuote,
} from "lucide-react";
import React from "react";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Feedbacks",
    href: "/dashboard/feedback",
    icon: <MessageSquareQuote className="h-4 w-4" />,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <SidebarProvider sidebarItems={sidebarItems}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar sidebarTitle="Manager dashboard" />
          <div className="flex flex-col">
            <div className="w-full">
              <DashboardHeader />
            </div>
            <div className="h-14 gap-4 px-4 flex items-center">
              <MyBreadcrumb />
            </div>
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.28))]">
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
