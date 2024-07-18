import { z } from "zod";

export const AddEventPackageSchema = z.object({
  description: z.string(),
  title: z.string(),
});

export type AddEventPackageType = z.infer<typeof AddEventPackageSchema>;

export const AddEventPackageSchemaDefaultValues: AddEventPackageType = {
  description: "",
  title: "",
};
