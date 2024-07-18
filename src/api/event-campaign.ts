import { axiosClient, axiosClientFormData } from "@/api/axiosClient";
import {
  mapBackEndEventCampaignsToEventCampaigns,
  mapBackEndEventCampaignToEventCampaign,
  mapBackEndEventDonationToEventDonation,
} from "@/lib/event-campaign";
import {
  BackEndEventCampaign,
  BackEndEventDonation,
  EventCampaignStatusEnum,
} from "@/types/event-campaign";

export interface GetEventCampaignSendData {
  PageIndex?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: string;
  EventId?: number;
  StartDate?: string;
  EndDate?: string;
  isDeleted?: boolean;
}

export const getEventCampaign = async (data: GetEventCampaignSendData) => {
  try {
    let baseUrl = "/campaigns";
    let params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof GetEventCampaignSendData];
      if (value !== null && value !== undefined) {
        params.append(key, value.toString());
      }
    });
    const queryString = params.toString();
    if (queryString) {
      baseUrl = baseUrl.concat(`?${queryString}`);
    }
    const response = (await axiosClient.get<BackEndEventCampaign[]>(baseUrl))
      .data;
    return mapBackEndEventCampaignsToEventCampaigns(response);
  } catch (error) {
    throw error;
  }
};

export const getEventCampaignById = async (campaignId: number) => {
  try {
    const response = (
      await axiosClient.get<BackEndEventCampaign>(`/campaigns/${campaignId}`)
    ).data;
    return mapBackEndEventCampaignToEventCampaign(response);
  } catch (error) {
    throw error;
  }
};

export const getEventCampaignByEventId = async (eventId: number) => {
  try {
    const response = (
      await axiosClient.get<BackEndEventCampaign[]>(
        `/event/${eventId}/campaigns`
      )
    ).data;
    return mapBackEndEventCampaignsToEventCampaigns(response);
  } catch (error) {
    throw error;
  }
};

export interface CreateEventCampaignSendData {
  EventId: number;
  Name: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  Status: EventCampaignStatusEnum;
  GoalAmount: number;
}

export interface CreateEventCampaignResponse {
  status: boolean;
  message: string;
  data: BackEndEventCampaign;
}

export const createEventCampaign = async (
  data: CreateEventCampaignSendData
) => {
  try {
    const response = (
      await axiosClientFormData.post<CreateEventCampaignResponse>(
        "/campaigns",
        data
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventCampaignToEventCampaign(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface UpdateEventCampaignSendData {
  id: number;
  Name: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  Status: EventCampaignStatusEnum;
  GoalAmount: number;
}

export interface UpdateEventCampaignResponse {
  status: boolean;
  message: string;
  data: BackEndEventCampaign;
}

export const updateEventCampaign = async (
  data: UpdateEventCampaignSendData
) => {
  try {
    const response = (
      await axiosClient.put<UpdateEventCampaignResponse>(
        `/campaigns/${data.id}`,
        data
      )
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventCampaignToEventCampaign(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export interface DeleteEventCampaignResponse {
  status: boolean;
  message: string;
}
export const deleteEventCampaign = async (campaignId: number) => {
  try {
    const response = (
      await axiosClient.delete<DeleteEventCampaignResponse>(
        `/campaigns/${campaignId}`
      )
    ).data;
    return response;
  } catch (error) {
    throw error;
  }
};

export interface DonateSendData {
  "event-campaign-id": number;
  amount: number;
  "donation-date": Date;
}

export interface DonateResponse {
  status: boolean;
  message: string;
  data: BackEndEventDonation;
}

export const donate = async (data: DonateSendData) => {
  try {
    const response = (
      await axiosClient.post<DonateResponse>("/donations", data)
    ).data;
    return {
      status: response.status,
      message: response.message,
      data: mapBackEndEventDonationToEventDonation(response.data),
    };
  } catch (error) {
    throw error;
  }
};
