export type CreateEventRequest = {
  name: string;
  description: string;
  thumbnailUrl: string;
  eventStartDate: Date;
  eventEndDate: Date;
  location: {
    latitude: string;
    longitude: string;
    display: string;
    note: string;
    placeId: string;
  };
  note: string;
  eventCategoryId: string;
};

export type GetEventsParams = {
  SearchTerm?: string;
  EventCategoryId?: string;
  EventStartDate?: Date;
  EventEndDate?: Date;
  Status?: number;
  PageNumber?: number;
  PageSize?: number;
};
