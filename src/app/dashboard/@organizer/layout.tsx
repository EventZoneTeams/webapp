import { MyBreadcrumb } from "@/components/Breadcrumb";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/SideBar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrivateProvider from "@/providers/PrivateProvider";
import { SidebarItem } from "@/types/sidebar";
import { Home, SquarePlus, Users } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Organizer Dashboard",
};

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

// - Dashboard
// - Package Management
// - Product Management
// - Order Management
// - Attendee Management
// - Staff Management
// - Post Management

// const sidebarItems: SidebarItem[] = [
//   {
//     title: "Dashboard",
//     href: "",
//     icon: <Home className="h-4 w-4" />,
//   },
//   {
//     title: "Package Management",
//     href: "/package-management",
//     icon: <Package className="h-4 w-4" />,
//   },
//   {
//     title: "Product Management",
//     href: "/product-management",
//     icon: <ShoppingCart className="h-4 w-4" />,
//   },
//   {
//     title: "Order Management",
//     href: "/order-management",
//     icon: <Book className="h-4 w-4" />,
//   },
//   {
//     title: "Attendee Management",
//     href: "/attendee-management",
//     icon: <Users className="h-4 w-4" />,
//   },
//   {
//     title: "Staff Management",
//     href: "/staff-management",
//     icon: <Users className="h-4 w-4" />,
//   },
//   {
//     title: "Post Management",
//     href: "/post-management",
//     icon: <StickyNote className="h-4 w-4" />,
//   },
// ];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
        <Sidebar
          sidebarItems={sidebarItems}
          sidebarTitle="Organizer dashboard"
          parentPath="/dashboard"
        />
        <div className="flex flex-col">
          <div className="w-full">
            <DashboardHeader />
          </div>
          <div className="h-14 gap-4 px-4 flex items-center">
            <MyBreadcrumb />
          </div>
          <ScrollArea className="h-[calc(100vh_-_theme(spacing.28))] ">
            <main className="flex flex-col gap-4 px-4 lg:gap-6 lg:px-4 h-full ">
              {children}
            </main>
          </ScrollArea>
        </div>
      </div>
    </PrivateProvider>
  );
}
