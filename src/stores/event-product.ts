import { GetEventSendData } from "@/api/event";
import { GetEventProductsSendData } from "@/api/event-product";
import { create } from "zustand";

interface EventProductState {
  queryObj: GetEventProductsSendData;
  setQueryObj: (queryObj: GetEventProductsSendData) => void;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (isCreateDialogOpen: boolean) => void;
  trigger: boolean;
  switchTrigger: () => void;
}

export const useEventProductStore = create<EventProductState>((set) => ({
  queryObj: {},
  setQueryObj: (queryObj) => set({ queryObj }),
  isCreateDialogOpen: false,
  setIsCreateDialogOpen: (isCreateDialogOpen) => set({ isCreateDialogOpen }),
  trigger: false,
  switchTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));
