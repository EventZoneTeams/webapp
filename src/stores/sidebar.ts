import { SidebarItem } from "@/types/sidebar";
import { create } from "zustand";

interface SidebarState {
  sidebarItems: SidebarItem[];
  setSidebarItems: (items: SidebarItem[]) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  sidebarItems: [],
  setSidebarItems: (items) => set({ sidebarItems: items }),
}));
