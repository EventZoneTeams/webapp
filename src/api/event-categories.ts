import { axiosClient } from "@/api/axiosClient";
import { EventCategory } from "@/types/event-categories";

export interface GetEventCategoriesResponse {
  data: EventCategory[];
  success: boolean;
  message: string;
}

export const getEventCategories = async () => {
  try {
    const response = await axiosClient.get("/event-categories");
    return response.data as GetEventCategoriesResponse;
  } catch (error) {
    throw new Error(error as string);
  }
};
