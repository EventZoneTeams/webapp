import { User } from "@/types/authuser";

export type FeedBack = {
  EventId: number;
  Content: string;
  CreatedAt: Date;
  IsDeleted: boolean;
  User: User;
};

export type BackendFeedBack = {
  "event-id": number;
  content: string;
  "created-at": Date;
  "is-deleted": boolean;
  user: User;
};
