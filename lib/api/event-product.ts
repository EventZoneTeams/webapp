import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  CreateEventProductRequest,
  EventProduct as EventProductType,
  UpdateEventProductRequest,
} from "@/types/event-product";

export namespace EventProduct {
  // Create a new event product
  interface CreatedProductResponse {
    id: string;
  }
  
  export async function create(
    payload: CreateEventProductRequest,
  ): Promise<ApiResponse<CreatedProductResponse>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<CreatedProductResponse>>(
          "/event-products",
          payload,
        )
      ).data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data, // Now response.data will contain the id and other relevant fields
        };
      } else {
        return {
          isSuccess: false,
          message: response.message,
          data: null, // Return null when the creation fails
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
  export async function getProductsByEventId(
    eventId: string,
  ): Promise<ApiResponse<EventProductType[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<EventProductType[]>>(
          `/event-products`,
          {
            params: { EventId: eventId },
          },
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

  // Update event product
  export async function update(
    id: string,
    payload: UpdateEventProductRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.put<ApiResponse<null>>(
          `/event-products/${id}`,
          payload,
        )
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

  // Delete event product
  export async function deleteById(id: string): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.delete<ApiResponse<null>>(`/event-products/${id}`)
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
}
