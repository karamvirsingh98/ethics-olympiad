import { z } from "zod";

export type zOlympiadHeats = z.infer<typeof zOlympiadHeats>;
export const zOlympiadHeats = z.array(
  z.object({ case1: z.number(), case2: z.number() })
);

export type zUserRole = z.infer<typeof zUserRole>;
export const zUserRole = z.enum(["Admin", "Manager"]);

export type zOlympiadLevel = z.infer<typeof zOlympiadLevel>;
export const zOlympiadLevel = z.enum([
  "Junior",
  "Middle",
  "Senior",
  "Tertiary",
]);

export type zOlympiadScore = z.infer<typeof zOlympiadScore>;
export const zOlympiadScore = z.object({
  clarity: z.number(),
  centrality: z.number(),
  thoughtfulness: z.number(),
  response: z.number(),
  judge: z.number(),
  commentary: z.number(),
  respectfulness: z.number(),
});
