import z from "zod";

export const PlanSchema = z.object({
  location: z.string(),
  days: z.number(),
  budget: z.enum(["cheap", "mid", "luxury"]),
  travelers: z.number(),
  preferences: z.array(z.string()),
});

export const ItinerarySchema = z.object({
  summary: z.string(),
  recommendedHotel: z.object({
    name: z.string(),
    address: z.string().optional(),
    rating: z.number().optional(),
    photoUrl: z.string().nullable().optional(),
  }),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      weather: z.string(),
      activities: z.array(
        z.object({
          place: z.string(),
          notes: z.string(),
        }),
      ),
    }),
  ),
  travelTips: z.array(z.string()),
});

export type Plan = z.infer<typeof PlanSchema>;
