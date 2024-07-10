import { BackEndNotification, Notification } from "@/types/notification";

export const mapBackendNotification = (
  backendData: BackEndNotification
): Notification => {
  return {
    Id: backendData.id,
    Title: backendData.title,
    Body: backendData.body,
    UserId: backendData["user-id"],
    IsRead: backendData["is-read"],
    Url: backendData.url,
    Sender: backendData.sender,
    CreatedAt: backendData["created-at"],
  };
};

export const mapBackendNotifications = (
  backendData: BackEndNotification[]
): Notification[] => {
  return backendData.map(mapBackendNotification);
};
