import { mapBackendUserToUser } from "@/lib/user";
import {
  BackEndEventCampaign,
  BackEndEventDonation,
  EventCampaign,
  EventDonation,
} from "@/types/event-campaign";

export const mapBackEndEventDonationToEventDonation = (
  backEndEventDonation: BackEndEventDonation
): EventDonation => {
  return {
    id: backEndEventDonation.id,
    userId: backEndEventDonation["user-id"],
    isDeleted: backEndEventDonation["is-deleted"],
    createdAt: backEndEventDonation["created-at"],
    user: backEndEventDonation.user
      ? mapBackendUserToUser(backEndEventDonation.user)
      : null,
    eventCampaignId: backEndEventDonation["event-campaign-id"],
    amount: backEndEventDonation.amount,
    donationDate: backEndEventDonation["donation-date"],
  };
};

export const mapBackEndEventDonationsToEventDonations = (
  backEndEventDonations: BackEndEventDonation[]
): EventDonation[] => {
  return backEndEventDonations.map(mapBackEndEventDonationToEventDonation);
};

export const mapBackEndEventCampaignToEventCampaign = (
  eventCampaign: BackEndEventCampaign
): EventCampaign => {
  return {
    id: eventCampaign.id,
    name: eventCampaign.name,
    description: eventCampaign.description,
    startDate: new Date(eventCampaign["start-date"]),
    endDate: new Date(eventCampaign["end-date"]),
    status: eventCampaign.status,
    goalAmount: eventCampaign["goal-amount"],
    collectedAmount: eventCampaign["colelcted-amount"],
    eventId: eventCampaign["event-id"],
    eventDonations: mapBackEndEventDonationsToEventDonations(
      eventCampaign["event-donations"]
    ),
  };
};

export const mapBackEndEventCampaignsToEventCampaigns = (
  backEndEventCampaigns: BackEndEventCampaign[]
): EventCampaign[] => {
  return backEndEventCampaigns.map(mapBackEndEventCampaignToEventCampaign);
};
