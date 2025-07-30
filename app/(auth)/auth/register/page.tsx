"use client";
import SignUpForm from "../components/sign-up-form";
import { useRegister } from "@/hooks/useAuthUser";

const SignUpPage = () => {
  const { handleRegister, isLoading, isError, error } = useRegister();
  return (
    <SignUpForm
      onSubmit={handleRegister}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};
export default SignUpPage;
