import { axiosInstance } from "@/lib/api";
import { ApiResponse, ApiResponseWithPaging } from "@/types/api";
import { CreateEventRequest, GetEventsParams } from "@/types/api/event";
import { Event as EventType } from "@/types/event";
import { Paging } from "@/types/api";
export namespace Event {
  export async function create(
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

  export async function get(
    params: GetEventsParams,
  ): Promise<ApiResponseWithPaging<EventType[]>> {
    try {
      let queryString = new URLSearchParams();

      Object.keys(params).forEach((key) => {
        if (params[key as keyof GetEventsParams]) {
          queryString.append(
            key,
            params[key as keyof GetEventsParams] as string,
          );
        }
      });

      const axiosResponse = await axiosInstance.get<ApiResponse<EventType[]>>(
        "/events",
        {
          params: queryString,
        },
      );

      const response = axiosResponse.data;
      const paginationHeader = axiosResponse.headers["pagination"];
      let paging: Paging | undefined;

      if (paginationHeader) {
        paging = JSON.parse(paginationHeader);
      }

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: "Success",
          data: response.data,
          paging,
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

  export async function getById(id: string): Promise<ApiResponse<EventType>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<EventType>>(`/events/${id}`)
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
