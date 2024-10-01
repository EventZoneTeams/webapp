import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  CreateEventOrderRequest,
  EventOrder as EventOrderType,
} from "@/types/event-order";

export namespace EventOrder {
  // Create a new event order
  export async function create(
    payload: CreateEventOrderRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<null>>("/event-orders", payload)
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Order created successfully",
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

  // Get event orders by Event ID
  export async function getOrdersByEventId(
    eventId: string,
  ): Promise<ApiResponse<EventOrderType[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<EventOrderType[]>>(
          `/event/${eventId}/event-orders`,
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Orders retrieved successfully",
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
