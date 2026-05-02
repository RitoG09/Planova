import z from "zod";

export const PlanSchema = z.object({
  location: z.string(),
  days: z.number(),
  budget: z.enum(["cheap", "mid", "luxury"]),
  travelers: z.number(),
  preferences: z.array(z.string()),
});

export type Plan = z.infer<typeof PlanSchema>;
