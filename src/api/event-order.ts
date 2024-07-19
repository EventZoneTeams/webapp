import { axiosClient } from "@/api/axiosClient";
import {
  mapBackEndEventOrdersToEventOrders,
  mapBackEndEventOrderToEventOrder,
} from "@/lib/event-order";
import {
  BackEndEventOrder,
  BackEndEventOrderDetails,
  EventOrder,
  EventOrderStatusEnum,
} from "@/types/event-order";

export interface GetEventOrderByEventIdSendData {
  id: number;
  "search-term"?: string;
  "from-date"?: string;
  "to-date"?: string;
  status?: EventOrderStatusEnum;
  "page-number"?: number;
  "page-size"?: number;
}
export interface GetEventOrderByEventIdResponse {
  status: boolean;
  data: BackEndEventOrder[];
  message: string;
}
export const getEventOrderByEventId = async (
  data: GetEventOrderByEventIdSendData
) => {
  try {
    let baseUrl = `/event/${data.id}/event-orders`;
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof GetEventOrderByEventIdSendData];
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    if (queryString) {
      baseUrl = baseUrl.concat(`?${queryString}`);
    }

    const response = (
      await axiosClient.get<GetEventOrderByEventIdResponse>(baseUrl)
    ).data;
    return {
      status: response.status,
      data: mapBackEndEventOrdersToEventOrders(response.data),
      message: response.message,
    };
  } catch (error) {
    throw error;
  }
};

export type GetEventOrderByIdResponse = {
  status: boolean;
  message: string;
  data: BackEndEventOrder;
};
export const getEventOrderById = async (eventOrderId: number) => {
  try {
    const response = (
      await axiosClient.get<GetEventOrderByIdResponse>(
        `/event-orders/${eventOrderId}`
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventOrderToEventOrder(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface OrderDetailsSendData {
  "package-id": number;
  quantity: number;
}
export interface CreateEventOrderSendData {
  "event-id": number;
  "event-order-details": OrderDetailsSendData[];
}

export interface CreateEventOrderResponse {
  success: boolean;
  message: string;
  data: BackEndEventOrder;
}
export const createEventOrder = async (data: CreateEventOrderSendData) => {
  try {
    const response = await axiosClient.post<CreateEventOrderResponse>(
      `/event-orders`,
      data
    );
    return {
      success: response.data.success,
      message: response.data.message,
      data: mapBackEndEventOrderToEventOrder(response.data.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface UpdateEventOrderSendData {
  id: number;
  status: EventOrderStatusEnum;
}

export interface UpdateEventOrderResponse {
  success: boolean;
  message: string;
  data: BackEndEventOrder;
}

export const updateEventOrder = async (data: UpdateEventOrderSendData) => {
  try {
    const response = await axiosClient.put<UpdateEventOrderResponse>(
      `/event-orders/${data.id}`,
      data
    );
    return {
      success: response.data.success,
      message: response.data.message,
      data: mapBackEndEventOrderToEventOrder(response.data.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface GetMyOrderResponse {
  success: boolean;
  data: BackEndEventOrder[];
  message: string;
}
export const getMyOrder = async () => {
  try {
    const response = (
      await axiosClient.get<GetMyOrderResponse>(`/users/me/event-orders`)
    ).data;
    return {
      sucess: response.success,
      data: mapBackEndEventOrdersToEventOrders(response.data),
      message: response.message,
    };
  } catch (error) {
    throw error;
  }
};
