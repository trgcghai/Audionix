import z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const createTrackSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  albums: z.array(optionSchema).optional(),
  cover_image: z
    .array(
      z
        .instanceof(File, { message: "Cover image is required" })
        .refine((file) => file.size < 10 * 1024 * 1024, {
          message: "Cover image must be less than 10MB",
        }),
    )
    .min(1, "Cover image is required"),
  audio: z
    .array(
      z
        .instanceof(File, { message: "Audio file is required" })
        .refine((file) => file.size < 10 * 1024 * 1024, {
          message: "Audio file must be less than 10MB",
        }),
    )
    .min(1, "Audio file is required"),
  genres: z
    .array(optionSchema, { message: "At least one genre is required" })
    .min(1, "At least one genre is required"),
});

export type createTrackValues = z.infer<typeof createTrackSchema>;
