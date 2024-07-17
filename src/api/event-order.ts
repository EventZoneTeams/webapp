import { axiosClient } from "@/api/axiosClient";
import { EventOrder } from "@/types/event-order";

export interface GetEventOrderResponse {
  status: boolean;
  data: EventOrder[];
  message: string;
}
export const getEventOrder = async (eventId: number) => {
  try {
    const response = await axiosClient.get<GetEventOrderResponse>(
      `/api/v1/event/${eventId}/event-orders`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
