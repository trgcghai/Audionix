import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB, MAX_GENRES } from "@/app/constant";
import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const artistSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  genres: z
    .array(optionSchema, { message: "At least one genre is required" })
    .min(1, "At least one genre is required")
    .max(MAX_GENRES, `You can select up to ${MAX_GENRES} genres`),
  cover_images: z
    .instanceof(File, { message: "Cover image must be a valid file" })
    .refine((value) => value.size < MAX_FILE_SIZE, {
      message: `Cover image must be less than ${MAX_FILE_SIZE_MB}MB`,
    })
    .optional(),
});

export type ArtistFormValues = z.infer<typeof artistSchema>;
