import { EventStatus } from "@/types/event";

export const eventStatusConstances: EventStatus[] = [
  { value: 1, label: "Draft" },
  { value: 2, label: "Pending" },
  { value: 3, label: "Published" },
  { value: 4, label: "Rejected" },
  { value: 5, label: "Completed" },
  { value: 6, label: "Archived" },
  { value: 7, label: "Cancelled" },
];
