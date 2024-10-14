import { Event } from "./event";

export interface CreateEventPostRequest {
  eventId: string;
  title: string;
  body?: string;
  imageUrls: string[];
}

export interface EventPost {
  id: string;
  // postComments: any[];
  createdAt: string;
  isDeleted: boolean;
  eventImages: PostImage[];
  eventId: string;
  title: string;
  body: string;
  imageUrls: string | null;
}

export interface PostImage {
  id: string;
  imageUrl: string;
  name: string;
  isDeleted: boolean;
}
