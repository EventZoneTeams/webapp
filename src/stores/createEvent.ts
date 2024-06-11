import {
  BasicInfoSchemaType,
  BasicInfoDefaultValues,
  MoreInfoFormSchemaType,
  MoreInfoFormDefaultValues,
} from "@/schemas/createEventSchema";
import { ImageType } from "react-images-uploading";
import { create } from "zustand";

interface EventState {
  BasicInfo: BasicInfoSchemaType;
  Thumbnail: ImageType | null;
  MoreInfo: MoreInfoFormSchemaType;
  setImage: (image: ImageType) => void;
  setEvent: (state: Partial<BasicInfoSchemaType>) => void;
  setMoreInfo: (state: Partial<MoreInfoFormSchemaType>) => void;
  reset: () => void;
}

const initialState: EventState = {
  BasicInfo: BasicInfoDefaultValues,
  Thumbnail: null,
  MoreInfo: MoreInfoFormDefaultValues,
  setEvent: () => {},
  setImage: () => {},
  setMoreInfo: () => {},
  reset: () => {},
};

export const useCreateEventStore = create<EventState>((set) => ({
  ...initialState,
  setEvent: (state) =>
    set((prev) => {
      return {
        BasicInfo: { ...prev.BasicInfo, ...state },
      };
    }),
  setImage: (image) => set({ Thumbnail: image }),
  setMoreInfo: (state) =>
    set((prev) => {
      return {
        MoreInfo: { ...prev.MoreInfo, ...state },
      };
    }),
  reset: () => set(initialState),
}));
