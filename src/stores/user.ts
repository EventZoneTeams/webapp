import { User } from "@/types/authuser";
import { create } from "zustand";

interface UserStore {
  authUser: User | null;
  setAuthUser: (authUser: User) => void;
  reset: () => void;
}

const initialState: UserStore = {
  authUser: null,
  setAuthUser: () => {},
  reset: () => {},
};

export const useUserStore = create<UserStore>()((set) => ({
  authUser: null,
  setAuthUser: (authUser) => set({ authUser }),
  reset: () => set(initialState),
}));
