import {
  BasicInfoSchemaType,
  BasicInfoDefaultValues,
  MoreInfoFormSchemaType,
  MoreInfoFormDefaultValues,
  DonationFormSchemaType,
  DonationFormDefaultValues,
  TermAndConditionSchemaType,
  TermAndConditionDefaultValues,
} from "@/schemas/createEventSchema";
import { create } from "zustand";

interface EventState {
  BasicInfo: BasicInfoSchemaType;
  Thumbnail: File | null;
  MoreInfo: MoreInfoFormSchemaType;
  Donation: DonationFormSchemaType;
  TermAndCons: TermAndConditionSchemaType;
  setImage: (image: File | null) => void;
  setEvent: (state: Partial<BasicInfoSchemaType>) => void;
  setMoreInfo: (state: Partial<MoreInfoFormSchemaType>) => void;
  setDonation: (state: Partial<DonationFormSchemaType>) => void;
  setTermAndCons: (state: Partial<TermAndConditionSchemaType>) => void;
  reset: () => void;
}

const initialState: EventState = {
  BasicInfo: BasicInfoDefaultValues,
  Thumbnail: null,
  MoreInfo: MoreInfoFormDefaultValues,
  Donation: DonationFormDefaultValues,
  TermAndCons: TermAndConditionDefaultValues,
  setEvent: () => {},
  setImage: () => {},
  setMoreInfo: () => {},
  setDonation: () => {},
  setTermAndCons: () => {},
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
  setTermAndCons: (state) =>
    set((prev) => {
      return {
        TermAndCons: { ...prev.TermAndCons, ...state },
      };
    }),
  reset: () => set(initialState),
}));
