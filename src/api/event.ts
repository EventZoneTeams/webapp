import { axiosClientFormData, axiosClient } from "@/api/axiosClient";
import { OrganizationStatusEnum, StatusEnum } from "@/enums/statusEnum";
import { mapBackendEventsToEvents, mapBackendEventToEvent } from "@/lib/event";
import { BackendUser } from "@/types/authuser";
import { BackendEvent } from "@/types/event";

// type
export interface CreateEventSendData {
  name: string;
  description: string;
  "thumbnail-url": File | null;
  "donation-start-date": Date | null | undefined;
  "donation-end-date": Date | null | undefined;
  "event-start-date": Date;
  "event-end-date": Date;
  note: string;
  location: string;
  "user-id": number;
  "event-category-id": number;
  university: string;
  status: StatusEnum;
  "organization-status": OrganizationStatusEnum;
  "is-donation": boolean;
  "total-cost": number | null | undefined;
}

export const createEvent = async (data: CreateEventSendData) => {
  try {
    const response = await axiosClientFormData.post("/events", data);
    console.log(response.data);
  } catch (error) {
    throw new Error(error as string);
  }
};

export interface GetEventSendData {
  "search-term"?: string;
  "event-category-id"?: number;
  UserId?: number;
  "donation-start-date"?: Date;
  "event-end-date"?: Date;
  status?: StatusEnum;
  "page-number"?: number;
  "page-size"?: number;
}
export interface GetEventsResponse {
  success: boolean;
  data: BackendEvent[];
  "current-page": number;
  "page-size": number;
  "total-count": number;
  "total-pages": number;
  message: string;
}
export const getEvent = async (data: GetEventSendData) => {
  try {
    let baseUrl = "/events";
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof GetEventSendData];
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    if (queryString) {
      baseUrl = baseUrl.concat(`?${queryString}`);
    }
    const response = (await axiosClient.get<GetEventsResponse>(baseUrl)).data;
    return {
      Success: response.success,
      Data: mapBackendEventsToEvents(response.data),
      CurrentPage: response["current-page"],
      PageSize: response["page-size"],
      TotalCount: response["total-count"],
      TotalPages: response["total-pages"],
      Message: response.message,
    };
  } catch (error) {
    throw new Error(error as string);
  }
};

export interface GetEventByIdResponse {
  success: boolean;
  data: BackendEvent;
  message: string;
}
export const getEventById = async (eventId: number) => {
  try {
    const response = (
      await axiosClient.get<GetEventByIdResponse>(`/events/${eventId}`)
    ).data;
    return mapBackendEventToEvent(response.data);
  } catch (error) {
    throw new Error(error as string);
  }
};
