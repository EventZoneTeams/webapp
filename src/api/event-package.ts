import { axiosClient } from "@/api/axiosClient";
import { BackEndEventPackage } from "@/types/event-packages.";
import { mapBackEndEventPackagesToEventPackages } from "@/lib/event-package";

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
