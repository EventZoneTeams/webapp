import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CreateEventRequest } from "@/types/api/event";

export namespace Event {
  export async function createEvent(
    payload: CreateEventRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<null>>("/events", payload)
      ).data;
      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Success",
          data: null,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: null,
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: null,
      };
    }
  }
}
