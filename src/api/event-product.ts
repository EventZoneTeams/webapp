import { axiosClient } from "@/api/axiosClient";
import { mapBackEndEventProductsToEventProducts } from "@/lib/event-product";
import { BackEndEventProduct } from "@/types/event-product";

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
