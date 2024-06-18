import { create } from "zustand";
import { Event } from "../../types/event";

interface CurrentEventState {
  currentEvent: Event | null;
  setCurrentEvent: (event: Event) => void;
  reset(): void;
}

const initialState: CurrentEventState = {
  currentEvent: null,
  setCurrentEvent: () => {},
  reset: () => {},
};

export const useCurrentEvent = create<CurrentEventState>(
  (set): CurrentEventState => ({
    ...initialState,
    setCurrentEvent: (event) => set({ currentEvent: event }),
    reset: () => set(initialState),
  })
);
