import { axiosClient } from "@/api/axiosClient";
import { mapBackendFeedBacksToFeedBacks } from "@/lib/feedback";
import { BackendFeedBack } from "@/types/feedback";

//type
interface AddEventFeedBackResponse {
  status: boolean;
  message: string;
}

//function
export const getEventFeedBack = async (eventId: number) => {
  try {
    const response = (
      await axiosClient.get<BackendFeedBack[]>(
        `/event-feedbacks/events/${eventId}`
      )
    ).data;
    return mapBackendFeedBacksToFeedBacks(response);
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addEventFeedBack = async (evenId: number, content: string) => {
  try {
    const response = (
      await axiosClient.post<AddEventFeedBackResponse>("/event-feedbacks", {
        "event-id": evenId,
        content,
      })
    ).data;
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};
