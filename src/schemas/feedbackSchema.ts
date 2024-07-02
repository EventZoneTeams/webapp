import z from "zod";

export const FeedbackSchema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.enum(["REJECT", "APPROVE"]),
});

export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;

export const FeedbackDefaultValues: FeedbackSchemaType = {
  content: "",
  status: "REJECT",
};
