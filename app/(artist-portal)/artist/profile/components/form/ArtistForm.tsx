"use client";
import useArtistForm from "@/app/(artist-portal)/artist/profile/hooks/useArtistForm";
import { DEFAULT_GENRES, MAX_GENRES } from "@/app/constant";
import { ApiErrorResponse } from "@/app/types/api";
import { Artist } from "@/app/types/model";
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
import MultipleSelector from "@/components/ui/MultipleSelector";
import { cn } from "@/libs/utils";

interface ArtistFormProps {
  artist?: Artist;
  className?: string;
  showCancelButton?: boolean;
  submitButtonProps?: {
    className?: string;
    disabled?: boolean;
    text?: string;
  };
}

const ArtistForm = ({
  artist,
  className,
  submitButtonProps = {
    className: "",
    disabled: false,
    text: "Save changes",
  },
  showCancelButton = true,
}: ArtistFormProps) => {
  const {
    form,
    onSubmit,
    isError,
    error,
    isLoading,
    closeDialog,
    openDialog,
    setDialogOpen,
    dialogOpen,
  } = useArtistForm({
    artist,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        <div className="flex justify-center items-center gap-6">
          <FormField
            control={form.control}
            name="cover_images"
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                initialPreview={
                  artist && artist.cover_images
                    ? artist.cover_images[0]?.url
                    : ""
                }
                disabled={isLoading}
                variant="user"
              />
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="h-full w-full space-y-1">
              <FormLabel
                required
                htmlFor={field.name}
                className="font-semibold"
              >
                Artist Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="!bg-transparent"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem className="h-full w-full space-y-1">
              <FormLabel htmlFor={field.name} className="font-semibold">
                Genres
              </FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  options={DEFAULT_GENRES}
                  maxSelected={MAX_GENRES}
                  creatable
                  placeholder="Select genres"
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
          {showCancelButton && (
            <Button
              className="rounded-full"
              type="button"
              variant="destructive"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            className={cn("min-w-32 rounded-full", submitButtonProps.className)}
            type="button"
            disabled={isLoading || submitButtonProps.disabled}
            onClick={openDialog}
          >
            {isLoading ? <LoaderSpin /> : submitButtonProps.text}
          </Button>
          <ConfirmDialog
            title="Confirm to submit the form?"
            description={`Are you sure you want to submit the form? Please check the information again before submit.`}
            onConfirm={() => form.handleSubmit(onSubmit)()}
            onCancel={closeDialog}
            isOpen={dialogOpen}
            setIsOpen={setDialogOpen}
          />
        </div>
      </form>
    </Form>
  );
};
export default ArtistForm;
