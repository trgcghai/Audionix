import { MAX_FILE_SIZE, MAX_FILE_SIZE_MB } from "@/app/constant";
import z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username cannot exceed 100 characters"),
  avatar: z
    .instanceof(File, { message: "Avatar must be a valid file" })
    .refine((value) => value.size < MAX_FILE_SIZE, {
      message: `Avatar must be less than ${MAX_FILE_SIZE_MB}MB`,
    })
    .optional(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "New password must be at least 8 characters long")
    .refine(
      (value) => {
        // Check if the password contains at least one uppercase letter, one lowercase letter, and one number
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        return hasUppercase && hasLowercase && hasNumber;
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      },
    ),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
});

export type UserFormValues = z.infer<typeof userSchema>;
