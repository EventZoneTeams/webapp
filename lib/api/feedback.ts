import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { FeedBackRequest } from "@/types/api/feedback";

export namespace FeedBack {
  export async function feedback(
    payload: FeedBackRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const sendPayload = {
        eventId: payload.eventId,
        content: payload.content,
      };
      const response = (
        await axiosInstance.post<ApiResponse<null>>(
          "/event-feedbacks",
          sendPayload,
          {
            params: { feedbackOption: payload.feedbackOption },
          },
        )
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to send feedback",
        data: null,
      };
    }
  }
}
