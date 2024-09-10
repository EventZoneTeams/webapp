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
