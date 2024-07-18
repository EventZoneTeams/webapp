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

export interface GetEventOrderResponse {
  status: boolean;
  data: BackEndEventOrder[];
  message: string;
}
export const getEventOrder = async (eventId: number) => {
  try {
    const response = await axiosClient.get<GetEventOrderResponse>(
      `/api/v1/event/${eventId}/event-orders`
    );
    return {
      status: response.data.status,
      data: mapBackEndEventOrdersToEventOrders(response.data.data),
      message: response.data.message,
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
        `/api/v1/event-orders/${eventOrderId}`
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
      `/api/v1/event-orders`,
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
