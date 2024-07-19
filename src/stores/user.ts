import { GetUserSendData } from "@/api/user";
import { User } from "@/types/authuser";
import { create } from "zustand";

interface UserStore {
  trigger: boolean;
  switchTrigger: (trigger: boolean) => void;
  queryObj: GetUserSendData;
  setQueryObj: (queryObj: GetUserSendData) => void;
  authUser: User | null;
  setAuthUser: (authUser: User) => void;
  reset: () => void;
}

const initialState: UserStore = {
  trigger: false,
  switchTrigger: () => {},
  queryObj: {},
  setQueryObj: () => {},
  authUser: null,
  setAuthUser: () => {},
  reset: () => {},
};

export const useUserStore = create<UserStore>()((set) => ({
  ...initialState,
  switchTrigger: (trigger) => set({ trigger }),
  setQueryObj: (queryObj) => set({ queryObj }),
  setAuthUser: (authUser) => set({ authUser }),
  reset: () => set(initialState),
}));
