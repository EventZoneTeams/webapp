import { axiosClientFormData, axiosClient } from "@/api/axiosClient";
import { OrganizationStatusEnum, StatusEnum } from "@/enums/statusEnum";
import { mapBackendEventsToEvents } from "@/lib/event";
import { BackendEvent } from "@/types/event";

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

//get event
export interface GetEventSendData {
  SearchTerm?: string;
  EventCategoryId?: number;
  IsDonation?: boolean;
  DonationStartDate?: Date;
  DonationEndDate?: Date;
  EventStartDate?: Date;
  EventEndDate?: Date;
  Location?: string;
  University?: string;
  Status?: StatusEnum;
  OrganizationStatus?: OrganizationStatusEnum;
  PageNumber: number;
  PageSize: number;
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
    const response = await axiosClient.get(baseUrl);
    const backendData = response.data as BackendEvent[];
    return mapBackendEventsToEvents(backendData);
  } catch (error) {
    throw new Error(error as string);
  }
};
