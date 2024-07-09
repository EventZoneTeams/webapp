import React from "react";
import { Home, Package, Users } from "lucide-react";
import Sidebar from "@/components/SideBar/Sidebar";
import { MyBreadcrumb } from "@/components/Breadcrumb";
import PrivateProvider from "@/providers/PrivateProvider";
import { SidebarItem } from "@/types/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarProvider from "@/providers/SidebarProvider";

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
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar sidebarTitle="Admin dashboard" />
          <div className="flex flex-col">
            <ScrollArea className="h-[calc(100vh_-_theme(spacing.14))]">
              <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
                {children}
              </main>
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </PrivateProvider>
  );
}
