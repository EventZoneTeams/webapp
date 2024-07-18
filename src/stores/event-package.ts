import { GetEventPackageSendData } from "@/api/event-package";
import { create } from "zustand";

interface EventPackageState {
  trigger: boolean;
  switchTrigger: () => void;
  queryObj: GetEventPackageSendData;
  setQueryObj: (queryObj: GetEventPackageSendData) => void;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
}

export const useEventPackageStore = create<EventPackageState>((set) => ({
  trigger: false,
  switchTrigger: () => set((state) => ({ trigger: !state.trigger })),
  queryObj: {},
  setQueryObj: (queryObj) => set({ queryObj }),
  isCreateDialogOpen: false,
  setIsCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),
}));
