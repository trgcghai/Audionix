import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from "@/app/constant";
import { z } from "zod";

export const PlaylistFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().optional(),
  image: z
    .instanceof(File, { message: "Image must be a valid file" })
    .refine((value) => value.size < MAX_FILE_SIZE, {
      message: `Image must be less than ${MAX_FILE_SIZE_MB}MB`,
    })
    .optional(),
});

export type PlaylistFormValues = z.infer<typeof PlaylistFormSchema>;
