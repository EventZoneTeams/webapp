import { create } from "zustand";

interface AuthUserStore {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  login: (user: AuthUserStore["user"]) => void;
  logout: () => void;
}
