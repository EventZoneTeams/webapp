import { MyBreadcrumb } from "@/components/Breadcrumb";
import Sidebar from "@/components/SideBar/Sidebar";
import PrivateProvider from "@/providers/privateProvider";
import { SidebarItem } from "@/types/sidebar";
import { Home, Package, SquarePlus, Users } from "lucide-react";
import React from "react";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "My Events",
    href: "/my-events",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Create Event",
    href: "/create-event",
    icon: <SquarePlus className="h-4 w-4" />,
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <div className="grid min-h-[calc(100vh_-_theme(spacing.20))] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar sidebarItems={sidebarItems} sidebarTitle="Admin dashboard" />
        <div className="flex flex-col">
          <div className="h-14 gap-4 border-b bg-secondary px-4 lg:h-[60px] lg:px-6 flex items-center">
            <MyBreadcrumb />
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
            {children}
          </main>
        </div>
      </div>
    </PrivateProvider>
  );
}
