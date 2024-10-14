import { z } from "zod";

export const AddDepositSchema = z.object({
  amount: z.number().positive().min(2000).max(10000000),
  agree: z.boolean(),
});

export type AddDepositSchemaType = z.infer<typeof AddDepositSchema>;

export const AddDepositSchemaDefaultValues: AddDepositSchemaType = {
  amount: 0,
  agree: false,
};
