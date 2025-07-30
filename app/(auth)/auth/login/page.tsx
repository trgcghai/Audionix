"use client";
import { LoginForm } from "../components/login-form";
import { useLogin } from "@/hooks/useAuthUser";

export default function LoginPage() {
  const { handleLogin, isLoading, isError, error } = useLogin();

  return (
    <LoginForm
      onSubmit={handleLogin}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
}
