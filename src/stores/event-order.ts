import { GetEventOrderByEventIdSendData } from "@/api/event-order";
import { create } from "zustand";

interface EventOrderState {
  queryObj: GetEventOrderByEventIdSendData;
  setQueryObj: (queryObj: GetEventOrderByEventIdSendData) => void;
  trigger: boolean;
  switchTrigger: () => void;
}

export const useEventOrderStore = create<EventOrderState>((set) => ({
  queryObj: {
    id: 0,
  },
  setQueryObj: (queryObj) => set({ queryObj }),
  trigger: false,
  switchTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));
