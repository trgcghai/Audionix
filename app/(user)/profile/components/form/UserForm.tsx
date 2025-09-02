"use client";
import ImageUpload from "@/app/(user)/profile/components/form/ImageUpload";
import useUserForm from "@/app/(user)/profile/hooks/useUserForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
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
import { Label } from "@/components/ui/label";
import { useUserSlice } from "@/store/slices/userSlice";

const UserForm = () => {
  const user = useUserSlice();
  const { form, onSubmit, isError, error, isLoading } = useUserForm({
    user: {
      username: user.username,
    },
  });

  console.log(isError);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                initialPreview={user.avatar ? user.avatar[0].url : ""}
                disabled={isLoading}
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
                <FormLabel htmlFor={field.name}>Username</FormLabel>
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
        <div className="space-y-3 cursor-not-allowed">
          <Label className="">Email</Label>
          <Input
            value={user.email}
            disabled
            className="bg-input border-border"
          />
        </div>

        {isError && (
          <div>
            <ErrorMessage
              variant="inline"
              message={
                (error as ApiErrorResponse).message ||
                "An error occurred while updating."
              }
            />
          </div>
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
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            type="submit"
            disabled={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UserForm;
