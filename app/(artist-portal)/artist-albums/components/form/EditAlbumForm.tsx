"use client";
import { ImageUploadField } from "@/app/(artist-portal)/artist-albums/components/form/ImageUploadField";
import useCreateAlbumForm from "@/app/(artist-portal)/artist-albums/hooks/useCreateAlbumForm";
import { DEFAULT_GENRES } from "@/app/constant";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
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
import { Textarea } from "@/components/ui/textarea";

const EditAlbumForm = () => {
  const {
    form,
    dialogOpen,
    isLoading,
    isError,
    error,
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  } = useCreateAlbumForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="">
          <FormField
            control={form.control}
            name="cover_image"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel required className="text-md font-semibold">
                  Cover Image
                </FormLabel>
                <FormControl>
                  <ImageUploadField field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel required className="text-md font-semibold">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Album title"
                    className="!bg-transparent"
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
            name="genres"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel required className="text-md font-semibold">
                  Genres
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    options={DEFAULT_GENRES}
                    maxSelected={5}
                    creatable
                    placeholder="Select genres"
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
            name="description"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel className="text-md font-semibold">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Album description"
                    className="!bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isError && (
          <ErrorMessage
            message={
              (error as ApiErrorResponse)?.data?.message ||
              "An error occurred while uploading the track."
            }
          />
        )}

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6 py-2"
            onClick={handleReset}
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
            description={`Are you sure you want to create new album? Please ensure all details are correct before proceeding.`}
            onConfirm={() => form.handleSubmit(handleSubmit)()}
            onCancel={closeConfirmDialog}
            isOpen={dialogOpen}
            setIsOpen={setDialogOpen}
          />
        </div>
      </form>
    </Form>
  );
};
export default EditAlbumForm;
