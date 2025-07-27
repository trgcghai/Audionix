import z from "zod";

export const createTrackSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  album: z.string().optional(),
  image: z.instanceof(File, { message: "Cover image is required" }),
  audioFile: z.instanceof(File, { message: "Audio file is required" }),
  status: z.string({ message: "Status is required" }),
});

export type createTrackValues = z.infer<typeof createTrackSchema>;
