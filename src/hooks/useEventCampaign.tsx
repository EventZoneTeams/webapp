import {
  getEventCampaign,
  getEventCampaignByEventId,
  getEventCampaignById,
  GetEventCampaignSendData,
  createEventCampaign,
  deleteEventCampaign,
  updateEventCampaign,
  CreateEventCampaignSendData,
  UpdateEventCampaignSendData,
} from "@/api/event-campaign";
import { useMutation } from "@tanstack/react-query";
import React from "react";

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
  return {
    getEventCampaignMutation,
    getEventCampaignByIdMutation,
    getEventCampaignByEventIdMutation,
    createEventCampaignMutation,
    deleteEventCampaignMutation,
    updateEventCampaignMutation,
  };
}
