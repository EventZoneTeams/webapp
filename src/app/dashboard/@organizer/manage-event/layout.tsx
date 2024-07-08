import SidebarProvider from "@/providers/SidebarProvider";
import { SidebarItem } from "@/types/sidebar";
import {
  Book,
  Home,
  Package,
  ShoppingCart,
  StickyNote,
  Users,
} from "lucide-react";
import React from "react";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard 1",
    href: "",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Package Management",
    href: "/package-management",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Product Management",
    href: "/product-management",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Order Management",
    href: "/order-management",
    icon: <Book className="h-4 w-4" />,
  },
  {
    title: "Attendee Management",
    href: "/attendee-management",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Staff Management",
    href: "/staff-management",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Post Management",
    href: "/post-management",
    icon: <StickyNote className="h-4 w-4" />,
  },
];
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider sidebarItems={sidebarItems}>{children}</SidebarProvider>
  );
}
