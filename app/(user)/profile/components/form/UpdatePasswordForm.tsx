"use client";
import CheckPasswordStrength from "@/app/(user)/profile/components/CheckPasswordStrength";
import usePasswordForm from "@/app/(user)/profile/hooks/usePasswordForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const UpdatePasswordForm = () => {
  const { form, onSubmit, isLoading, isError, error } = usePasswordForm();

  console.log(error);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Current Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="bg-input border-border"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="bg-input border-border"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
              {field.value && <CheckPasswordStrength password={field.value} />}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  className="bg-input border-border"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && (
          <ErrorMessage
            variant="inline"
            message={(error as ApiErrorResponse)?.data?.message}
          />
        )}

        <div className="flex justify-end gap-2">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            type="button"
            variant="destructive"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-32"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoaderSpin /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdatePasswordForm;
