import { GetEventSendData } from "@/api/event";
import { GetEventProductsSendData } from "@/api/event-product";
import { create } from "zustand";

interface EventProductState {
  queryObj: GetEventProductsSendData;
  setQueryObj: (queryObj: GetEventProductsSendData) => void;
}

export const useEventProductStore = create<EventProductState>((set) => ({
  queryObj: {},
  setQueryObj: (queryObj) => set({ queryObj }),
}));
