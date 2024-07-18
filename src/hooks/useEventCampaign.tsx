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
import Swal from "sweetalert2";

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
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Successfully",
        text: "Contribute successfully!",
        confirmButtonText: "OK",
        confirmButtonColor: "#30a5e8",
      }).then((result) => {
        window.location.reload();
      });
    },
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
