import z from "zod";

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

export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;

export const BasicInfoDefaultValues: BasicInfoSchemaType = {
  Name: "",
  EventStartDate: new Date(),
  EventEndDate: new Date(),
  Location: "",
  EventCategoryId: "",
  University: "",
};
