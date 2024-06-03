import z from "zod";

export const BasicInfoSchema = z.object({
  Name: z
    .string()
    .min(3, "At least 3 character")
    .max(255, "At most 255 character"),
  Description: z.string().min(3, "At least 3 character"),
  EventDateRange: z
    .object(
      {
        from: z.date(),
        to: z.date(),
      },
      { required_error: "Date is required." }
    )
    .refine((date) => {
      return !!date.to;
    }, "End Date is required."),
  Location: z.string().min(3, "At least 3 character"),
  EventCategoryId: z.number(),
  University: z.string().min(3, "At least 3 character"),
});

export type BasicInfoSchemaType = z.infer<typeof BasicInfoSchema>;

export const BasicInfoDefaultValues: BasicInfoSchemaType = {
  Name: "",
  Description: "",
  EventDateRange: {
    from: new Date(),
    to: new Date(),
  },
  Location: "",
  EventCategoryId: 0,
  University: "",
};
