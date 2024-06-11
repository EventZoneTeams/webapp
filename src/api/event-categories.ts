import { axiosClient } from "@/api/axiosClient";
import { EventCategory } from "@/types/event-categories";

export interface getEventCategoriesResponse {
  success: boolean;
  data: EventCategory[];
  message: string;
}

export const getEventCategories = async () => {
  try {
    const response = await axiosClient.get("/event-categories");
    return response.data as getEventCategoriesResponse;
  } catch (error) {
    throw new Error(error as string);
  }
};
