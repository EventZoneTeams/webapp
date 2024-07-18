import {
  createEventCampaign,
  CreateEventCampaignSendData,
  deleteEventCampaign,
  donate,
  DonateSendData,
  getEventCampaign,
  getEventCampaignByEventId,
  getEventCampaignById,
  GetEventCampaignSendData,
  updateEventCampaign,
  UpdateEventCampaignSendData,
} from "@/api/event-campaign";
import { useMutation } from "@tanstack/react-query";

export default function useEventCampaign() {
  const getEventCampaignMutation = useMutation({
    mutationFn: (data: GetEventCampaignSendData) => getEventCampaign(data),
  });

  const getEventCampaignByIdMutation = useMutation({
    mutationFn: (campaignId: number) => getEventCampaignById(campaignId),
  });

  const getEventCampaignByEventIdMutation = useMutation({
    mutationFn: (eventId: number) => getEventCampaignByEventId(eventId),
  });

  const createEventCampaignMutation = useMutation({
    mutationFn: (data: CreateEventCampaignSendData) =>
      createEventCampaign(data),
  });

  const deleteEventCampaignMutation = useMutation({
    mutationFn: (campaignId: number) => deleteEventCampaign(campaignId),
  });

  const updateEventCampaignMutation = useMutation({
    mutationFn: (data: UpdateEventCampaignSendData) =>
      updateEventCampaign(data),
  });

  const donateMutation = useMutation({
    mutationFn: (data: DonateSendData) => donate(data),
  });
  return {
    getEventCampaignMutation,
    getEventCampaignByIdMutation,
    getEventCampaignByEventIdMutation,
    createEventCampaignMutation,
    deleteEventCampaignMutation,
    updateEventCampaignMutation,
    donateMutation,
  };
}
