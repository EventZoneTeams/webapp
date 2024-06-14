import { axiosClientFormData } from "@/api/axiosClient";
import { OriganizationStatusEnum, StatusEnum } from "@/enums/statusEnum";

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
  "organization-status": OriganizationStatusEnum;
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
