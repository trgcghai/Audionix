"use client";
import useAdminUserForm from "@/app/(admin)/admin/management/users/components/form/useAdminUserForm";
import CheckPasswordStrength from "@/app/(user)/profile/components/CheckPasswordStrength";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import ImageUpload from "@/components/form/ImageUpload";
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

const AdminUserForm = () => {
  const {
    form,
    onSubmit,
    error,
    isError,
    isLoading,
    setDialogOpen,
    dialogOpen,
    closeConfirmDialog,
    openConfirmDialog,
  } = useAdminUserForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center items-center gap-6">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
                variant="user"
              />
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="h-full w-full space-y-1">
                <FormLabel required htmlFor={field.name}>
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-input border-border"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-full w-full space-y-1">
                <FormLabel required htmlFor={field.name}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-input border-border"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-full w-full space-y-1">
                <FormLabel required htmlFor={field.name}>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="bg-input border-border"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
                {field.value && (
                  <CheckPasswordStrength password={field.value} />
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="h-full w-full space-y-1">
                <FormLabel required htmlFor={field.name}>
                  Confirm Password
                </FormLabel>
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
        </div>

        {isError && (
          <div>
            <ErrorMessage
              variant="inline"
              message={
                (error as unknown as ApiErrorResponse)?.data?.message ||
                "An error occurred while updating."
              }
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            className="bg-primary rounded-full text-primary-foreground hover:bg-primary/90"
            type="button"
            variant="destructive"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="min-w-24 rounded-full px-6 py-2"
            onClick={openConfirmDialog}
          >
            {isLoading ? <LoaderSpin /> : "Create"}
          </Button>
          <ConfirmDialog
            title="Confirm create"
            description={`Are you sure you want to create new user? Please ensure all details are correct before proceeding.`}
            onConfirm={() => form.handleSubmit(onSubmit)()}
            onCancel={closeConfirmDialog}
            isOpen={dialogOpen}
            setIsOpen={setDialogOpen}
          />
        </div>
      </form>
    </Form>
  );
};
export default AdminUserForm;

//AdminAdminUserForm
