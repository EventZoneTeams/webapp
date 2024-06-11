import { axiosClientFormData } from "@/api/axiosClient";
import { OriganizationStatusEnum, StatusEnum } from "@/enums/statusEnum";
import { ImageType } from "react-images-uploading";

export interface CreateEventSendData {
  Name: string;
  Description: string;
  ThumbnailUrl: ImageType | null;
  DonationStartDate: Date | null | undefined;
  DonationEndDate: Date | null | undefined;
  EventStartDate: Date;
  EventEndDate: Date;
  Note: string;
  Location: string;
  UserId: number;
  EventCategoryId: number;
  University: string;
  Status: StatusEnum;
  OriganizationStatus: OriganizationStatusEnum;
  IsDonation: boolean;
  TotalCost: number | null | undefined;
}

export const createEvent = async (data: CreateEventSendData) => {
  try {
    console.log(data);
    const response = await axiosClientFormData.post("/events", data);
    console.log(response.data);
  } catch (error) {
    throw new Error(error as string);
  }
};
