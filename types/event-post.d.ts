import { Event } from "./event";

export interface CreateEventPostRequest {
  eventId: string;
  title: string;
  body?: string;
  imageUrl: string[];
}

export interface EventPost {
  id: string;
  eventId: string;
//   event: Event; Chưa cần
  title: string;
  body?: string;
  createdAt: string;
  imageUrl: PostImage[];
}

export interface PostImage {
  id: string;
  imageUrl: string;
  name: string;
}
