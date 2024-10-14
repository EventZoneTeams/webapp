import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { AddStaffRequest } from "@/types/api/staff";
import { User } from "@/types/user";
import { Event as EventType } from "@/types/event";

export namespace Staff {
  export const getEventStaff = async (): Promise<ApiResponse<EventType[]>> => {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<EventType[]>>(
          `EventStaff/get-staff-events`,
        )
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to get events",
        data: [],
      };
    }
  };

  export const getStaffFromEvent = async (
    eventId: string,
  ): Promise<ApiResponse<User[]>> => {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<User[]>>(`/EventStaff/${eventId}`)
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to get staff from event",
        data: [],
      };
    }
  };

  export const addStaffToEvent = async (
    payload: AddStaffRequest,
  ): Promise<ApiResponse<null>> => {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<null>>(
          `/EventStaff/${payload.eventId}`,
          payload,
        )
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to add staff to event",
        data: null,
      };
    }
  };

  export const removeStaffFromEvent = async (
    eventId: string,
    userId: string,
  ): Promise<ApiResponse<null>> => {
    try {
      const response = (
        await axiosInstance.delete<ApiResponse<null>>(
          `/EventStaff/${eventId}`,
          {
            params: { userId },
          },
        )
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to remove staff from event",
        data: null,
      };
    }
  };
}
