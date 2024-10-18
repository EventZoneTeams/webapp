import { axiosInstance } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  BookedTicket,
  CreateTicketRequest,
  Ticket as TicketType,
} from "@/types/ticket";

export namespace Ticket {
  // Create a new ticket
  export async function create(
    payload: CreateTicketRequest,
  ): Promise<ApiResponse<null>> {
    try {
      const response = (
        await axiosInstance.post<ApiResponse<null>>("/event-tickets", payload)
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

  // Get ticket by ID
  export async function getById(id: string): Promise<ApiResponse<TicketType>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<TicketType>>(`/event-tickets/${id}`)
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

  // Get tickets by event ID
  export async function getTicketsByEventId(
    eventId: string,
  ): Promise<ApiResponse<TicketType[]>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<TicketType[]>>(
          `/events/${eventId}/event-tickets`,
        )
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

  //Get my tickets
  export async function getMyTicket(): Promise<
    ApiResponse<BookedTicket[] | null>
  > {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<BookedTicket[]>>(
          "/users/me/booked-tickets",
        )
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to get my ticket",
        data: null,
      };
    }
  }

  export async function getBookedTicketById(
    id: string,
  ): Promise<ApiResponse<BookedTicket>> {
    try {
      const response = (
        await axiosInstance.get<ApiResponse<BookedTicket>>(
          `/booked-tickets/${id}`,
        )
      ).data;
      return response;
    } catch (error) {
      return {
        isSuccess: false,
        message: "Failed to get booked ticket by id",
        data: null,
      };
    }
  }
}
