import { LoginFormValues } from "@/app/(auth)/auth/schemas";
import { signIn } from "@/libs/auth";

export async function login(data: LoginFormValues) {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return null; // Return null or handle the error as needed
  }
}
