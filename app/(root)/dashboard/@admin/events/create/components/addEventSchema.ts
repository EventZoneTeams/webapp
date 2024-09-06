import { z } from "zod";

export const PredictionSchema = z.object({
  description: z.string(),
  place_id: z.string(),
  matched_substrings: z
    .array(
      z.object({
        length: z.number(),
        offset: z.number(),
      }),
    )
    .optional(),
  reference: z.string().optional(),
  structured_formatting: z
    .object({
      main_text: z.string(),
      main_text_matched_substrings: z
        .array(
          z.object({
            length: z.number(),
            offset: z.number(),
          }),
        )
        .optional(),
      secondary_text: z.string(),
      secondary_text_matched_substrings: z
        .array(
          z.object({
            length: z.number(),
            offset: z.number(),
          }),
        )
        .optional(),
    })
    .optional(),
  has_children: z.boolean().optional(),
  plus_code: z
    .object({
      compound_code: z.string().optional(),
      global_code: z.string().optional(),
    })
    .optional(),
  compound: z
    .object({
      district: z.string().optional(),
      commune: z.string().optional(),
      province: z.string().optional(),
    })
    .optional(),
  terms: z
    .array(
      z.object({
        offset: z.number(),
        value: z.string(),
      }),
    )
    .optional(),
  types: z.array(z.string()).optional(),
  distance_meters: z.number().nullable().optional(),
});

export const AddEventSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().optional(),
    eventStartDate: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    eventEndDate: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    location: PredictionSchema.nullable(),
    note: z.string(),
    eventCategoryId: z.string().min(1, "Category must be selected"),
  })
  .refine(
    (data) => {
      return data.eventStartDate < data.eventEndDate;
    },
    {
      message: "Event start date must be before event end date",
    },
  )
  .refine(
    (data) => {
      return data.location !== null;
    },
    {
      message: "Location must be entered",
    },
  );

export type AddEventSchemaType = z.infer<typeof AddEventSchema>;

export const AddEventSchemaDefaultValue: AddEventSchemaType = {
  name: "",
  description: "",
  eventStartDate: new Date(),
  eventEndDate: new Date(),
  location: null,
  note: "",
  eventCategoryId: "",
};
