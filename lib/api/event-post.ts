import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CreateEventPostRequest } from "@/types/event-post";
import { EventPost as EventPostType } from "@/types/event-post";

export namespace EventPost {
  // Create a new event post
  export async function createPost(
    payload: CreateEventPostRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<null>>("/event-posts", payload)
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
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

  // Get posts by Event ID
  export async function getPostsByEventId(
    eventId: string,
  ): Promise<ApiResponse<EventPostType[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<EventPostType[]>>(
          `/events/${eventId}/event-posts`,
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: [],
        };
      }
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: [],
      };
    }
  }
}
