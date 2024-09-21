export type Event = {
  id: string;
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
  userId: string;
  eventCategoryId: string;
  status: string;
  isDeleted: boolean;
  user: {
    id: string;
    email: string;
    unsignFullName: string;
    fullName: string;
    dob: Date;
    gender: string;
    workAt: string;
    isDeleted: boolean;
    imageUrl: string;
    role: null;
  };
  eventCategory: {
    id: string;
    title: string;
    imageUrl: string;
    description: null;
    isDeleted: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type EventStatus = {
  value: number;
  label: string;
};
