import { User } from "@/types/authuser";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  jwt: string | null;
  jwtRefreshToken: string | null;
  authUser: User | null;
  setJwt: (jwt: string) => void;
  setJwtRefreshToken: (jwtRefreshToken: string) => void;
  setAuthUser: (authUser: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      jwt: null,
      jwtRefreshToken: null,
      authUser: null,
      setJwt: (jwt) => set({ jwt }),
      setJwtRefreshToken: (jwtRefreshToken) => set({ jwtRefreshToken }),
      setAuthUser: (authUser) => set({ authUser }),
      logout: () => {
        set({ jwt: null, jwtRefreshToken: null, authUser: null });
        localStorage.removeItem("auth");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
