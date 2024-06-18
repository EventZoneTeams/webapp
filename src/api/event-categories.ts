import { axiosClient } from "@/api/axiosClient";
import { mapBackendEventCatesToEventCates } from "@/lib/event-category";
import { BackEndEventCategory, EventCategory } from "@/types/event-categories";

export interface GetEventCategoriesResponse {
  data: BackEndEventCategory[];
  success: boolean;
  message: string;
}

export const getEventCategories = async () => {
  try {
    const response = (
      await axiosClient.get<GetEventCategoriesResponse>("/event-categories")
    ).data;
    return mapBackendEventCatesToEventCates(response.data);
  } catch (error) {
    throw new Error(error as string);
  }
};
