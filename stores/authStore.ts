import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearAuth: () => set({ user: null }),
}));
