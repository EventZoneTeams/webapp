import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CreateEventProductRequest, EventProduct as EventProductType } from "@/types/event-product";

export namespace EventProduct {
  // Create a new event product
  export async function create(
    payload: CreateEventProductRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<null>>("/event-products", payload)
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

  // Get products by Event ID
  export async function getProductsByEventId(eventId: string): Promise<ApiResponse<EventProductType[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<EventProductType[]>>(`/event-products`, {
          params: { EventId: eventId },
        })
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Success",
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
