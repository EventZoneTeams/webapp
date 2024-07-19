import { BackEndEventProduct, EventProduct } from "@/types/event-product";

export type ProductInPackage = {
  productId: number;
  packageId: number;
  quantity: number;
  eventProduct: EventProduct;
};

export type EventPackage = {
  id: number;
  eventId: number;
  title: string;
  totalPrice: number;
  description: string;
  thumbnailUrl: string;
  isDeleted: boolean;
  productsInPackage: ProductInPackage[];
};

export type BackEndProductInPackage = {
  "product-id": number;
  "package-id": number;
  quantity: number;
  "event-product": BackEndEventProduct;
};
export type BackEndEventPackage = {
  id: number;
  "event-id": number;
  title: string;
  "total-price": number;
  description: string;
  "thumbnail-url": string;
  "is-deleted": boolean;
  "products-in-package": BackEndProductInPackage[];
};
