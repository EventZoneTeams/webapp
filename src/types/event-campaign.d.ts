import { BackendUser, User } from "@/types/authuser";

export type EventCampaignStatusEnum =
  | "DRAFT"
  | "PENDING"
  | "REJECTED"
  | "APPROVED"
  | "PUBLISHED"
  | "ONGOING"
  | "COMPLETED"
  | "CANCELLED";

export type BackEndEventDonation = {
  id: number;
  "user-id": number;
  "is-deleted": boolean;
  "created-at": string;
  user: BackendUser | null;
  "event-campaign-id": number;
  amount: number;
  "donation-date": Date;
};

export type EventDonation = {
  id: number;
  userId: number;
  isDeleted: boolean;
  createdAt: string;
  user: User | null;
  eventCampaignId: number;
  amount: number;
  donationDate: Date;
};

export type BackEndEventCampaign = {
  id: number;
  name: string;
  description: string;
  "start-date": string;
  "end-date": string;
  status: EventCampaignStatusEnum;
  "goal-amount": number;
  "colelcted-amount": number;
  "event-id": number;
  "event-donations": BackEndEventDonation[];
};

export type EventCampaign = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: EventCampaignStatusEnum;
  goalAmount: number;
  collectedAmount: number;
  eventId: number;
  eventDonations: EventDonation[];
};
