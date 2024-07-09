import {
  BackEndEventProduct,
  BackendProductImage,
  EventProduct,
  ProductImage,
} from "@/types/event-product";

export const mapBackendProductImageToProductImage = (
  backendProductImage: BackendProductImage
): ProductImage => {
  return {
    id: backendProductImage.id,
    imageUrl: backendProductImage["image-url"],
    name: backendProductImage.name,
  };
};

export const mapBackEndProductImagesToProductImages = (
  backendProductImages: BackendProductImage[]
): ProductImage[] => {
  return backendProductImages.map(mapBackendProductImageToProductImage);
};

export const mapBackEndEventProductToEventProduct = (
  backendEventProduct: BackEndEventProduct
): EventProduct => {
  return {
    id: backendEventProduct.id,
    isDeleted: backendEventProduct["is-deleted"],
    createdAt: backendEventProduct["created-at"],
    productImages: mapBackEndProductImagesToProductImages(
      backendEventProduct["product-images"]
    ),
    name: backendEventProduct.name,
    description: backendEventProduct.description,
    price: backendEventProduct.price,
    quantityInStock: backendEventProduct["quantity-in-stock"],
  };
};

export const mapBackEndEventProductsToEventProducts = (
  backendEventProducts: BackEndEventProduct[]
): EventProduct[] => {
  return backendEventProducts.map(mapBackEndEventProductToEventProduct);
};
