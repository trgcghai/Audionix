import { z } from "zod";

export const PlaylistFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().optional(),
  image: z.instanceof(File).optional(),
});

export type PlaylistFormValues = z.infer<typeof PlaylistFormSchema>;
