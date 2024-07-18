import { axiosClient, axiosClientFormData } from "@/api/axiosClient";
import { BackEndEventPackage, EventPackage } from "@/types/event-packages.";
import {
  mapBackEndEventPackagesToEventPackages,
  mapBackEndEventPackageToEventPackage,
} from "@/lib/event-package";

export interface GetEventPackageSendData {
  PageIndex?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: string;
  EventId?: number;
  MinTotalPrice?: number;
  MaxTotalPrice?: number;
  isDeleted?: boolean;
}

export const getEventPackages = async (data: GetEventPackageSendData) => {
  try {
    let baseUrl = "/event-packages";
    let params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof GetEventPackageSendData];
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    if (queryString) {
      baseUrl = baseUrl.concat(`?${queryString}`);
    }
    const response = (await axiosClient.get<BackEndEventPackage[]>(baseUrl))
      .data;
    return mapBackEndEventPackagesToEventPackages(response);
  } catch (error) {
    throw error;
  }
};

export interface PackageProductSendData {
  productid: number;
  quantity: number;
}
export interface CreateEventPackageSendData {
  eventId: number;
  Description: string;
  Products: PackageProductSendData[];
  Thumbnail: File;
}

export interface CreateEventPackageResponse {
  status: boolean;
  message: string;
  data: BackEndEventPackage;
}

export const createEventPackage = async (data: CreateEventPackageSendData) => {
  try {
    const form = new FormData();
    data.Products.forEach((product) => {
      form.append("Products", JSON.stringify(product));
    });
    form.append("Description", data.Description);
    form.append("Thumbnail", data.Thumbnail);

    const response = await axiosClientFormData.post<CreateEventPackageResponse>(
      `/event-packages?eventId=${data.eventId}`,
      form
    );
    return {
      status: response.data.status,
      message: response.data.message,
      data: mapBackEndEventPackageToEventPackage(response.data.data),
    };
  } catch (error) {
    throw error;
  }
};
