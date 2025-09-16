import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB, MAX_GENRES } from "@/app/constant";
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
        .instanceof(File, { message: "Cover image must be a valid file" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `Cover image must be less than ${MAX_FILE_SIZE_MB}MB`,
        }),
      { message: "Cover image is required" },
    )
    .min(1, { message: "Cover image is required" }),
  audio: z
    .array(
      z
        .instanceof(File, { message: "Audio file must be a valid file" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `Audio file must be less than ${MAX_FILE_SIZE_MB}MB`,
        }),
      { message: "Audio file is required" },
    )
    .min(1, { message: "Audio file is required" }),
  genres: z
    .array(optionSchema, { message: "At least one genre is required" })
    .min(1, "At least one genre is required")
    .max(MAX_GENRES, `You can select up to ${MAX_GENRES} genres`),
});

export type createTrackValues = z.infer<typeof createTrackSchema>;

export const updateTrackSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),
  albums: z.array(optionSchema).optional(),
  cover_image: z
    .array(
      z
        .instanceof(File, { message: "Cover image must be a valid file" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `Cover image must be less than ${MAX_FILE_SIZE_MB}MB`,
        })
        .optional(),
    )
    .optional(),
  audio: z
    .array(
      z
        .instanceof(File, { message: "Audio file must be a valid file" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: `Audio file must be less than ${MAX_FILE_SIZE_MB}MB`,
        })
        .optional(),
    )
    .optional(),
  genres: z
    .array(optionSchema, { message: "Genres must be selected" })
    .min(1, "At least one genre is required")
    .max(MAX_GENRES, `You can select up to ${MAX_GENRES} genres`)
    .optional(),
});

export type updateTrackValues = z.infer<typeof updateTrackSchema>;
