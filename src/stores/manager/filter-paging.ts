import { GetEventSendData, GetEventsResponse } from "@/api/event";
import { create } from "zustand";

interface FilterPagingState {
  queryObj: GetEventSendData;
  metaData: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  setQueryObj: (queryObj: GetEventSendData) => void;
  reset: () => void;
}

const initialState: FilterPagingState = {
  queryObj: {
    "page-size": 8,
  },
  metaData: {
    currentPage: 1,
    pageSize: 8,
    totalCount: 0,
    totalPages: 0,
  },
  setQueryObj: () => {},
  reset: () => {},
};

export const useFilterAndPaging = create<FilterPagingState>((set) => ({
  ...initialState,
  setQueryObj: (queryObj) => set({ queryObj }),
  reset: () => set({ ...initialState }),
}));
