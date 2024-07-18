import { axiosClient, axiosClientFormData } from "@/api/axiosClient";
import {
  mapBackEndEventProductsToEventProducts,
  mapBackEndEventProductToEventProduct,
} from "@/lib/event-product";
import { UpdateEventProductType } from "@/schemas/eventProductSchema";
import { BackEndEventProduct, EventProduct } from "@/types/event-product";

export type GetEventProductsSendData = {
  PageIndex?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: string;
  SearchName?: string;
  EventId?: number;
  MinPrice?: number;
  MaxPrice?: number;
  isDeleted?: boolean;
};
export const getEventProduct = async (data: GetEventProductsSendData) => {
  try {
    let baseUrl = "/event-products";
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof GetEventProductsSendData];
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    if (queryString) {
      baseUrl = baseUrl.concat(`?${queryString}`);
    }
    const response = (await axiosClient.get<BackEndEventProduct[]>(baseUrl))
      .data;
    return mapBackEndEventProductsToEventProducts(response);
  } catch (error) {
    throw error;
  }
};

export interface GetEventProductByIdResponse {
  status: boolean;
  message: string;
  data: BackEndEventProduct;
}
export const getEventProductById = async (id: number) => {
  try {
    const response = (
      await axiosClient.get<GetEventProductByIdResponse>(
        `/event-products/${id}`
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventProductToEventProduct(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface CreateEventProductSendData {
  EventId: number;
  Name: string;
  Description: string;
  Price: number;
  QuantityInStock: number;
  fileImages: File;
}

export interface CreateEventProductResponse {
  status: boolean;
  message: string;
  data: BackEndEventProduct;
}

export const createEventProduct = async (data: CreateEventProductSendData) => {
  try {
    const response = (
      await axiosClientFormData.post<CreateEventProductResponse>(
        "/event-products",
        data
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventProductToEventProduct(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface DeleteProductsResponse {
  status: boolean;
  message: string;
  data: BackEndEventProduct;
}
export const deleteEventProducts = async (product: number) => {
  try {
    const response = (
      await axiosClient.delete<DeleteProductsResponse>(
        `/event-products/${product}`
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventProductToEventProduct(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface UpdateEventProductSendData {
  productId: number;
  data: UpdateEventProductType;
}

export interface UpdateEventProductResponse {
  status: boolean;
  message: string;
  data: BackEndEventProduct;
}
export const updateEventProduct = async (data: UpdateEventProductSendData) => {
  try {
    const response = (
      await axiosClient.put<UpdateEventProductResponse>(
        `/event-products/${data.productId}`,
        data.data
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventProductToEventProduct(response.data),
    };
  } catch (error) {
    throw error;
  }
};
