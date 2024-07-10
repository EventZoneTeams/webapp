export type Notification = {
  Id: number;
  Title: string;
  Body: string;
  UserId: number;
  IsRead: boolean;
  Url: string;
  Sender: string;
  CreatedAt: string;
};

export type BackEndNotification = {
  id: number;
  title: string;
  body: string;
  "user-id": number;
  "is-read": boolean;
  "url": string;
  "sender": string;
  "created-at": string;
};