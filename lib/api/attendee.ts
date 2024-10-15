import { axiosInstance, handleApiError } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { BuyTicketRequest } from "@/types/api/attendee";

export namespace Attendee {
  export async function buyTicket(
    payload: BuyTicketRequest[],
  ): Promise<ApiResponse<null>> {
    try {
      const response = Promise.all(
        payload.map((ticket) =>
          axiosInstance.post<ApiResponse<null>>("/event-attendees", ticket),
        ),
      );
      console.log(response);
      return {
        data: null,
        isSuccess: true,
        message: response.message,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
        data: null,
      };
    }
  }
}
