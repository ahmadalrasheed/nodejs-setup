import { z } from "zod";
export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Must be a valid decimal number",
  }),
  tags: z.string(),
});
