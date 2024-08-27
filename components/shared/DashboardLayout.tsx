"use client";

import Sidebar from "@/components/shared/Sidebar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebarStore";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarStore();
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "ml-72" : "ml-32",
        )}
      >
        {children}
      </main>
    </>
  );
}
