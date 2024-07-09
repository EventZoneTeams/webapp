import { z } from "zod";

export const AddEventProductSchema = z.object({
  Name: z.string().min(1).max(255),
  Description: z.string().min(1).max(255),
  Price: z.number().min(0).positive(),
  QuantityInStock: z.number().min(0).positive(),
});

export type AddEventProductType = z.infer<typeof AddEventProductSchema>;

export const AddEventProductDefaultValue: AddEventProductType = {
  Name: "",
  Description: "",
  Price: 0,
  QuantityInStock: 0,
};
