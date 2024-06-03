import {
  BasicInfoSchemaType,
  BasicInfoDefaultValues,
} from "@/schemas/createEventSchema";
import { ImageType } from "react-images-uploading";
import { create } from "zustand";

interface EventState {
  BasicInfo: BasicInfoSchemaType;
  Thumbnail: ImageType | null;
  setImage: (image: ImageType) => void;
  setEvent: (state: Partial<BasicInfoSchemaType>) => void;
  reset: () => void;
}

const initialState: EventState = {
  BasicInfo: BasicInfoDefaultValues,
  Thumbnail: null,
  setEvent: () => {},
  setImage: () => {},
  reset: () => {},
};

export const useCreateEventStore = create<EventState>((set) => ({
  ...initialState,
  setEvent: (state) =>
    set((prev) => {
      console.log(prev.BasicInfo);
      return {
        BasicInfo: { ...prev.BasicInfo, ...state },
      };
    }),
  setImage: (image) => set({ Thumbnail: image }),
  reset: () => set(initialState),
}));
