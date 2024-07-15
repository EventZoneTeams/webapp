import { Event } from "@/types/event";
import { create } from "zustand";

interface EventState {
  currentEvent: Event | null;
  setCurrentEvent: (event: Event) => void;
}

export const useEventStore = create<EventState>((set) => ({
  currentEvent: null,
  setCurrentEvent: (currentEvent) => set({ currentEvent }),
}));
