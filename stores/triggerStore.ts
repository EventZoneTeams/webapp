import { create } from "zustand";

interface TrigerState {
  trigger: boolean;
  switchTrigger: () => void;
}

export const useTriggerStore = create<TrigerState>((set) => ({
  trigger: false,
  switchTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));
