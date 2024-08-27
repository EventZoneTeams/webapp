"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebarStore";
import React from "react";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 top-0 border-r border-gray-200 bg-background transition-all duration-300 ease-in-out",
        isOpen ? "w-72" : "w-32",
      )}
    >
      <div className="relative size-full">
        Sidebar
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 transform"
          onClick={() => toggleSidebar()}
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
    </div>
  );
}
