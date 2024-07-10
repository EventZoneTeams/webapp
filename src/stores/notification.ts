import { Notification } from "@/types/notification";
import { create } from "zustand";

interface NotificationState {
    notifications: Notification[];
    setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
}));
