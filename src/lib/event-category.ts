import { BackEndEventCategory, EventCategory } from "@/types/event-categories";

export const mapBackendEventCateToEventCate = (
  backendData: BackEndEventCategory
): EventCategory => {
  return {
    Id: backendData.id,
    Title: backendData.title,
    ImageUrl: backendData["image-url"],
  };
};

export const mapBackendEventCatesToEventCates = (
  backendData: BackEndEventCategory[]
): EventCategory[] => {
  return backendData.map(mapBackendEventCateToEventCate);
};
