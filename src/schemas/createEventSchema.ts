import z from "zod";

//Basic Info
export const BasicInfoSchema = z.object({
  Name: z
    .string()
    .min(3, "At least 3 character")
    .max(255, "At most 255 character"),
  EventStartDate: z.date(),
  EventEndDate: z.date(),
  Location: z.string().min(3, "At least 3 character"),
  EventCategoryId: z.string(),
  University: z.string().min(3, "At least 3 character"),
});
// .refine(
//   (data) => {
//     return data.EventStartDate < data.EventEndDate;
//   },
//   {
//     message: "Event start date should be less than event end date",
//     path: ["EventStartDate", "EventEndDate"],
//   }
// )
// .refine(
//   (data) => {
//     return data.EventStartDate > new Date();
//   },
//   {
//     message: "Event start date should be in future",
//     path: ["EventStartDate"],
//   }
// )
// .refine(
//   (data) => {
//     return data.EventCategoryId !== "";
//   },
//   {
//     message: "Please select an event category",
//     path: ["EventCategoryId"],
//   }
// );

export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;

export const BasicInfoDefaultValues: BasicInfoSchemaType = {
  Name: "",
  EventStartDate: new Date(),
  EventEndDate: new Date(),
  Location: "",
  EventCategoryId: "",
  University: "",
};

//More Info
export const MoreInfoFormSchema = z.object({
  Description: z.string().min(3, "At least 3 character"),
  Note: z.string().min(3, "At least 3 character"),
});

export type MoreInfoFormSchemaType = z.infer<typeof MoreInfoFormSchema>;

export const MoreInfoFormDefaultValues: MoreInfoFormSchemaType = {
  Description: "",
  Note: "",
};

//Donation
export const DonationFormSchema = z.object({
  IsDonation: z.boolean(),
  Name: z.string(),
  Description: z.string(),
  StartDate: z.date(),
  EndDate: z.date(),
  GoalAmount: z.number(),
});

export type DonationFormSchemaType = z.infer<typeof DonationFormSchema>;

export const DonationFormDefaultValues: DonationFormSchemaType = {
  IsDonation: false,
  Name: "",
  Description: "",
  StartDate: new Date(),
  EndDate: new Date(),
  GoalAmount: 0,
};

//Term and Condition
export const TermAndConditionSchema = z
  .object({
    Agree: z.boolean(),
  })
  .refine(
    (data) => {
      return data.Agree === true;
    },
    {
      message: "Please agree to the term and condition",
      path: ["Agree"],
    }
  );

export type TermAndConditionSchemaType = z.infer<typeof TermAndConditionSchema>;

export const TermAndConditionDefaultValues: TermAndConditionSchemaType = {
  Agree: false,
};
