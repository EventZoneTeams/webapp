import { z } from "zod";

export const AddEventSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  eventStartDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  eventEndDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  location: z.object({
    latitude: z.string(),
    longitude: z.string(),
    display: z.string(),
    note: z.string(),
  }),
  note: z.string(),
  eventCategoryId: z.string(),
});

export type AddEventSchemaType = z.infer<typeof AddEventSchema>;

export const AddEventSchemaDefaultValue: AddEventSchemaType = {
  name: "",
  description: "",
  eventStartDate: new Date(),
  eventEndDate: new Date(),
  location: {
    latitude: "",
    longitude: "",
    display: "",
    note: "",
  },
  note: "",
  eventCategoryId: "",
};
