import { StatusEnum } from "@/enums/statusEnum";
import { Thumb } from "@radix-ui/react-switch";
import { University } from "lucide-react";
import z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createEventSchema = z
  .object({
    Name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    ThumbnailURL: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    Description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" }),
    DonationStartDate: z.date(),
    DonationEndDate: z.date(),
    EventStartDate: z.date(),
    EventEndDate: z.date(),
    Location: z
      .string()
      .min(3, { message: "Location must be at least 3 characters long" }),
    UserId: z.number(),
    EventCategoryId: z.number(),
    University: z
      .string()
      .min(3, { message: "University must be at least 3 characters long" }),
    IsDonation: z.boolean(),
    TotalCost: z.number().min(0, { message: "Total cost must be at least 0" }),
    Agree: z.boolean(),
  })
  .refine(
    (data) => {
      return data.DonationStartDate < data.DonationEndDate;
    },
    {
      message: "Donation start date must be before donation end date",
      path: ["DonationStartDate"],
    }
  )
  .refine(
    (data) => {
      return data.EventStartDate < data.EventEndDate;
    },
    {
      message: "Event start date must be before event end date",
      path: ["EventStartDate"],
    }
  )
  .refine(
    (data) => {
      return data.DonationStartDate < data.EventStartDate;
    },
    {
      message: "Donation start date must be before event start date",
      path: ["DonationStartDate"],
    }
  )
  .refine(
    (data) => {
      return data.DonationEndDate < data.EventStartDate;
    },
    {
      message: "Donation end date must be before event start date",
      path: ["DonationEndDate"],
    }
  )
  .refine(
    (data) => {
      return data.Agree === true;
    },
    {
      message: "You must agree to the terms and conditions",
      path: ["Agree"],
    }
  );

export type createEventType = z.infer<typeof createEventSchema>;

export const createEventDefaultValues: createEventType = {
  Name: "",
  Description: "",
  DonationStartDate: new Date(),
  DonationEndDate: new Date(new Date().getDate() + 1),
  EventStartDate: new Date(),
  EventEndDate: new Date(new Date().getDate() + 1),
  Location: "",
  UserId: 0,
  EventCategoryId: 0,
  University: "",
  IsDonation: false,
  TotalCost: 0,
  Agree: false,
};
