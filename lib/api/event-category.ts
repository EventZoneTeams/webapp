import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { EventCategory as EventCategoryType } from "@/types/event-category";

export namespace EventCategory {
  export const getEventCategories = async (
    searchTerm?: string,
  ): Promise<ApiResponse<EventCategoryType[]>> => {
    try {
      const queryString = new URLSearchParams();
      if (searchTerm && searchTerm.length > 0) {
        queryString.append("search", searchTerm);
      }
      const response = (
        await axiosInstance.get<ApiResponse<EventCategoryType[]>>(
          "/event-categories",
          {
            params: queryString,
          },
        )
      ).data;

      return response;
    } catch (error: any) {
      return {
        data: [],
        isSuccess: false,
        message: error.message,
      };
    }
  };
}
