import { EventCategory } from "@/types/event-categories";

export type Event = {
  Id: number;
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
  EventCategory: EventCategory;
  University: string;
  Status: StatusEnum;
  OrganizationStatus: OrganizationStatusEnum;
  IsDonation: boolean;
  TotalCost: number | null | undefined;
};
