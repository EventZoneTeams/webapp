import {
  BasicInfoSchemaType,
  BasicInfoDefaultValues,
  MoreInfoFormSchemaType,
  MoreInfoFormDefaultValues,
  DonationFormSchemaType,
  DonationFormDefaultValues,
} from "@/schemas/createEventSchema";
import { ImageType } from "react-images-uploading";
import { create } from "zustand";

interface EventState {
  BasicInfo: BasicInfoSchemaType;
  Thumbnail: ImageType | null;
  MoreInfo: MoreInfoFormSchemaType;
  Donation: DonationFormSchemaType;
  setImage: (image: ImageType) => void;
  setEvent: (state: Partial<BasicInfoSchemaType>) => void;
  setMoreInfo: (state: Partial<MoreInfoFormSchemaType>) => void;
  setDonation: (state: Partial<DonationFormSchemaType>) => void;
  reset: () => void;
}

const initialState: EventState = {
  BasicInfo: BasicInfoDefaultValues,
  Thumbnail: null,
  MoreInfo: MoreInfoFormDefaultValues,
  Donation: DonationFormDefaultValues,
  setEvent: () => {},
  setImage: () => {},
  setMoreInfo: () => {},
  setDonation: () => {},
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
  setDonation: (state) =>
    set((prev) => {
      return {
        Donation: { ...prev.Donation, ...state },
      };
    }),
  reset: () => set(initialState),
}));
