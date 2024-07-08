"use client";

import { useSidebarStore } from "@/stores/sidebar";
import { SidebarItem } from "@/types/sidebar";
import React, { useEffect } from "react";

export default function SidebarProvider({
  children,
  sidebarItems,
}: {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
}) {
  const { setSidebarItems } = useSidebarStore();

  useEffect(() => {
    setSidebarItems(sidebarItems);
  }, [sidebarItems]);
  return children;
}
