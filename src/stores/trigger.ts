import { create } from "zustand";

interface TriggerStore {
  trigger: boolean;
  switchTrigger: () => void;
}

export const useTrigger = create<TriggerStore>((set) => ({
  trigger: false,
  switchTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));
