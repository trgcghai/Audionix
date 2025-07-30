"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/libs/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpFormValues, otpSchema } from "../schemas";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import ErrorMessage from "@/components/common/ErrorMessage";

interface OtpFormProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit: (data: OtpFormValues) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
}

const OtpForm = ({
  onSubmit,
  className,
  isLoading,
  isError,
  error,
  ...props
}: OtpFormProps) => {
  const [countDown, setCountDown] = useState<number>(120);
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (data: OtpFormValues) => {
    await onSubmit(data);
    form.reset();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify your account</CardTitle>
          <CardDescription className="space-y-2 text-sm">
            <p>Enter the OTP sent to your email to verify your account.</p>
            <p>
              The OTP will expire in{" "}
              <span className="text-primary font-semibold">{countDown}</span>{" "}
              seconds.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col items-center gap-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="g">
                    <FormControl>
                      <InputOTP
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        maxLength={6}
                        disabled={isLoading}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isError && (
                <ErrorMessage
                  message={error!}
                  showIcon={false}
                  variant="inline"
                />
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Submit"}
              </Button>
            </form>
          </Form>

          <div className="text-muted-foreground text-center text-sm">
            Don&apos;t receive the code?{" "}
            <span className="text-primary cursor-pointer underline-offset-4 hover:underline">
              Resend OTP
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default OtpForm;
