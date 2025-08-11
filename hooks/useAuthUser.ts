"use client";
import {
  LoginFormValues,
  OtpFormValues,
  SignUpFormValues,
} from "@/app/(auth)/auth/schemas";
import { ApiErrorResponse } from "@/app/types/api";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyMutation,
} from "@/services/auth/authApi";
import { useState } from "react";
import { useAppDispatch } from "./redux";
import { clearUser, setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const useRegister = () => {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (data: SignUpFormValues) => {
    try {
      const result = await register(data).unwrap();

      if (result.status === "success") {
        router.push(`/auth/verify-otp?email=${data.email}`);
      }
    } catch (error) {
      const { data } = error as { data: ApiErrorResponse; status: number };

      setError(
        data.message || "An unexpected error occurred. Please try again.",
      );
    }
  };

  return {
    handleRegister,
    isLoading,
    isError,
    error,
  };
};

const useLogin = () => {
  const [login, { isError, isLoading }] = useLoginMutation();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();

      if (result.status === "success") {
        const {
          data: {
            account: { email, role, firstName, lastName },
          },
        } = result;

        dispatch(
          setUser({
            email,
            roles: role,
            username: `${firstName} ${lastName}`,
          }),
        );

        router.push("/");
      }
    } catch (error) {
      const { data } = error as { data: ApiErrorResponse; status: number };

      setError(
        data.message || "An unexpected error occurred. Please try again.",
      );
    }
  };

  return {
    handleLogin,
    isLoading,
    isError,
    error,
  };
};

const useOtp = (email: string) => {
  const [verifyOtp, { isLoading, isError }] = useVerifyMutation();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleOtpSubmit = async (data: OtpFormValues) => {
    try {
      const result = await verifyOtp({ email: email!, otp: data.otp }).unwrap();

      if (result.status === "success") {
        router.push("/auth/login");
      }
    } catch (error) {
      const { data } = error as { data: ApiErrorResponse; status: number };

      setError(
        data.message || "An unexpected error occurred. Please try again.",
      );
    }
  };

  return {
    handleOtpSubmit,
    isLoading,
    isError,
    error,
  };
};

const useLogout = () => {
  const [logout, { isError, isLoading }] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error(
        (error as { data: ApiErrorResponse }).data.message ||
          "An unexpected error occurred during logout.",
      );
    } finally {
      dispatch(clearUser());
      router.push("/auth/login");
    }
  };

  return { handleLogout, isLoading, isError };
};

export { useRegister, useLogin, useOtp, useLogout };
