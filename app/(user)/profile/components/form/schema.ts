import { z } from "zod";

export const profileSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username cannot exceed 100 characters"),
  avatar: z
    .array(
      z
        .instanceof(File, { message: "Avatar image is required" })
        .refine((file) => file.size < 10 * 1024 * 1024, {
          message: "Avatar image must be less than 10MB",
        }),
    )
    .min(1, "Avatar image is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
