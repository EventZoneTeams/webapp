import { axiosClient } from "@/api/axiosClient";
import { mapBackendNotifications } from "@/lib/notification";
import { BackEndNotification } from "@/types/notification";



interface NotificationResponse {
    data: BackEndNotification[];
    success: boolean;
}
export const getAllNotifications = async (userId: number) => {
    try {
        const response = (
          await axiosClient.get<NotificationResponse>(
            `/notifications?userId=${userId}`
          )).data.data;
        return mapBackendNotifications(response);
      } catch (error) {
        throw new Error(error as string);
      }
}

