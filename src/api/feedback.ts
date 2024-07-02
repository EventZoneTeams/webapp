import { axiosClient } from "@/api/axiosClient";
import { mapBackendFeedBacksToFeedBacks } from "@/lib/feedback";
import { FeedbackSchemaType } from "@/schemas/feedbackSchema";
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

export const addEventFeedBack = async (
  eventId: number,
  data: FeedbackSchemaType
) => {
  try {
    const response = (
      await axiosClient.post<AddEventFeedBackResponse>(
        `/event-feedbacks?feedbackOption=${data.status}`,
        {
          "event-id": eventId,
          content: data.content,
        }
      )
    ).data;
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};
