"use client";
import { useLogin } from "@/hooks/useAuthUser";
import { LoginForm } from "../components/login-form";

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
