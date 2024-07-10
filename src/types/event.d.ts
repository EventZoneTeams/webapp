import { OrganizationStatusEnum, StatusEnum } from "@/enums/statusEnum";
import { BackendUser, User } from "@/types/authuser";
import { EventCategory } from "@/types/event-categories";
import { BackEndEventPackage, EventPackage } from "./event-packages.";

export type Event = {
  Id: number;
  Name: string;
  Description: string;
  ThumbnailUrl: string | null;
  DonationStartDate: Date | null | undefined;
  DonationEndDate: Date | null | undefined;
  EventStartDate: Date;
  EventEndDate: Date;
  Note: string;
  Location: string;
  UserId: number;
  User: User | null;
  EventCategory: EventCategory;
  University: string;
  Status: StatusEnum;
  OrganizationStatus: OrganizationStatusEnum;
  CreatedAt: Date;
  IsDonation: boolean;
  TotalCost: number | null | undefined;
  EventPackage: EventPackage[];
};

export type BackendEvent = {
  id: number;
  name: string;
  description: string | null;
  "thumbnail-url": string | null;
  "donation-start-date": string | null;
  "donation-end-date": string | null;
  "event-start-date": string;
  "event-end-date": string;
  note: string;
  location: string | null;
  "user-id": number;
  user: BackendUser | null;
  "event-category": {
    id: number;
    title: string;
    "image-url": string;
  };
  university: string | null;
  status: string;
  "origanization-status": string;
  "created-at": Date;
  "is-donation": boolean;
  "total-cost": number | null;
  "event-packages": BackEndEventPackage[];
};
