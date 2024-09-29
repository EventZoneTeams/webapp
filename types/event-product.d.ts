// event-product.d.ts

export interface CreateEventProductRequest {
    eventId: string;         // ID of the event this product belongs to
    name: string;            // Name of the product
    description?: string;    // Optional description of the product
    price: number;           // Price of the product
    quantityInStock: number; // Quantity available in stock
    imageUrls: string[];     // Array of image URLs
  }
  
  export interface EventProduct {
    id: string;              // Unique ID of the product
    eventId: string;         // ID of the event this product belongs to
    name: string;            // Name of the product
    description?: string;    // Optional description of the product
    price: number;           // Price of the product
    quantityInStock: number; // Quantity available in stock
    productImages: ProductImage[];  // Array of images associated with the product
    createdAt: string;       // Timestamp when the product was created
    isDeleted: boolean;      // Whether the product is deleted
  }
  
  export interface ProductImage {
    id: string;
    imageUrl: string;
    name: string;
  }
  