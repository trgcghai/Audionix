"use client";
import { useOtp } from "@/hooks/useAuthUser";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import OtpForm from "../components/otp-form";

const VerifyOtpPage = () => {
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email"), [searchParams]);

  const { handleOtpSubmit, isLoading, isError, error } = useOtp(email!);

  return (
    <OtpForm
      onSubmit={handleOtpSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
    />
  );
};
export default VerifyOtpPage;
