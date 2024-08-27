import { decryptData, encryptData } from "@/lib/crypto";
import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name: string) => {
          const data = localStorage.getItem(name);
          return data ? JSON.parse(decryptData(data)) : null;
        },
        setItem: (name: string, value: any) => {
          const encryptedValue = encryptData(JSON.stringify(value));
          localStorage.setItem(name, encryptedValue);
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
