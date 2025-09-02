import { z } from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username cannot exceed 100 characters"),
  avatar: z.instanceof(File).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
