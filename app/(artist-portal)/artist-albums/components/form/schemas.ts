import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from "@/app/constant";
import z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const createAlbumSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z.string().optional(),
  cover_image: z
    .array(
      z
        .instanceof(File, { message: "Cover image is required" })
        .refine((file) => file.size < MAX_FILE_SIZE, {
          message: `Cover image must be less than ${MAX_FILE_SIZE_MB}MB`,
        }),
    )
    .min(1, "Cover image is required"),
  genres: z
    .array(optionSchema, { message: "At least one genre is required" })
    .min(1, "At least one genre is required"),
});

export type createAlbumFormValues = z.infer<typeof createAlbumSchema>;
