import { OrganizationStatusEnum, StatusEnum } from "@/enums/statusEnum";
import { mapBackendUserToUser } from "@/lib/user";
import { BackendUser } from "@/types/authuser";
import { BackendEvent, Event } from "@/types/event";

export const mapBackendEventToEvent = (backendEvent: BackendEvent): Event => {
  return {
    Id: backendEvent.id,
    Name: backendEvent.name,
    Description: backendEvent.description || "",
    ThumbnailUrl: backendEvent["thumbnail-url"],
    DonationStartDate: backendEvent["donation-start-date"]
      ? new Date(backendEvent["donation-start-date"])
      : null,
    DonationEndDate: backendEvent["donation-end-date"]
      ? new Date(backendEvent["donation-end-date"])
      : null,
    EventStartDate: new Date(backendEvent["event-start-date"]),
    EventEndDate: new Date(backendEvent["event-end-date"]),
    Note: backendEvent.note,
    Location: backendEvent.location || "",
    UserId: backendEvent["user-id"],
    User: mapBackendUserToUser(backendEvent.user ?? ({} as BackendUser)),
    EventCategory: {
      Id: backendEvent["event-category"].id,
      Title: backendEvent["event-category"].title,
      ImageUrl: backendEvent["event-category"]["image-url"],
    },
    University: backendEvent.university || "",
    Status: backendEvent.status as StatusEnum,
    OrganizationStatus: backendEvent[
      "origanization-status"
    ] as OrganizationStatusEnum,
    CreatedAt: new Date(backendEvent["created-at"]),
    IsDonation: backendEvent["is-donation"],
    TotalCost: backendEvent["total-cost"],
  };
};

export const mapBackendEventsToEvents = (
  backendEvents: BackendEvent[]
): Event[] => {
  return backendEvents.map(mapBackendEventToEvent);
};
