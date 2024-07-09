export type BackendProductImage = {
  id: number;
  "image-url": string;
  name: string;
};

export type BackEndEventProduct = {
  id: number;
  "is-deleted": boolean;
  "created-at": Date;
  "product-images": BackendProductImage[];
  name: string;
  description: string;
  price: number;
  "quantity-in-stock": number;
};

export type ProductImage = {
  id: number;
  imageUrl: string;
  name: string;
};

export type EventProduct = {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  productImages: ProductImage[];
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
};
