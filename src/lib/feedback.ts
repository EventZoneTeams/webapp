import { BackendFeedBack, FeedBack } from "@/types/feedback";

export const mapBackendFeedBackToFeedBack = (
  backendFeedBack: BackendFeedBack
): FeedBack => {
  return {
    EventId: backendFeedBack["event-id"],
    Content: backendFeedBack.content,
    CreatedAt: backendFeedBack["created-at"],
    IsDeleted: backendFeedBack["is-deleted"],
    User: backendFeedBack.user,
  };
};

export const mapBackendFeedBacksToFeedBacks = (
  backendFeedBacks: BackendFeedBack[]
): FeedBack[] => {
  return backendFeedBacks.map(mapBackendFeedBackToFeedBack);
};
