import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  jwt: string | null;
  jwtRefreshToken: string | null;
  setJwt: (jwt: string) => void;
  setJwtRefreshToken: (jwtRefreshToken: string) => void;
  reset: () => void;
}

const initialState: AuthStore = {
  jwt: null,
  jwtRefreshToken: null,
  setJwt: () => {},
  setJwtRefreshToken: () => {},
  reset: () => {},
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      jwt: null,
      jwtRefreshToken: null,
      setJwt: (jwt) => set({ jwt }),
      setJwtRefreshToken: (jwtRefreshToken) => set({ jwtRefreshToken }),
      reset: () => set(initialState),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
