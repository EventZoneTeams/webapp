import { User } from "./user";

export type EventBoard = {
  id: string;
  eventId: string;
  name: string;
  imageUrl: string;
  priority: string;
  description: string;
  leaderId: string;
  leader: User;
  event: {
    name: string;
    description: string;
    thumbnailUrl: string;
    eventStartDate: string;
    eventEndDate: string;
    latitude: string;
    longitude: string;
    locationDisplay: string;
    locationNote: string;
    note: string;
    userId: string;
    eventCategoryId: string;
    status: string;
  };
  eventBoardColumns: EventBoardColumn[];
  eventBoardLabels: EventBoardLabel[];
  eventBoardTaskLabels: EventBoardTaskLabel[];
};

export type EventBoardColumn = {
  id: string;
  name: string;
  color: string | null;
  eventBoardTasks: EventBoardTask[];
};

export type EventBoardTask = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number | null;
  eventBoardTaskAssignments: {
    id: string;
  }[];
  eventBoardTaskLabels: {
    id: string;
  }[];
};

export type EventBoardLabel = {
  id: string;
  name: string;
  color: string;
};

export type EventBoardTaskLabel = {
  id: string;
  name: string;
  color: string;
};
