export type EventPackage = {
  Id: number;
  EventId: number;
  ImageUrl: string;
  TotalPrice: number;
  Description: string;
  ThumbnailUrl: string;
  IsDeleted: boolean;
  ProductsInPackage: Array;
};

export type BackEndEventPackage = {
  id: number;
  "event-id": number;
  "image-url": string;
  "total-price": number;
  description: string;
  "thumbnail-url": string;
  "is-deleted": boolean;
  "products-in-package": Array;
};
