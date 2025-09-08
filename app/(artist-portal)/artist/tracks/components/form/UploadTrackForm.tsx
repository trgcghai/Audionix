"use client";
import { DEFAULT_GENRES } from "@/app/constant";
import { mockAlbums } from "@/app/sampleData";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { ImageUploadField } from "@/components/form/ImageUploadFieldForm";
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
import { useCreateTrackForm } from "../../hooks/useCreateTrackForm";
import { AudioUploadField } from "./AudioUploadField";

const UploadTrackForm = () => {
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
  } = useCreateTrackForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="audio"
          render={({ field }) => (
            <FormItem className="h-full w-full">
              <FormLabel required className="text-md font-semibold">
                Audio File
              </FormLabel>
              <FormControl>
                <AudioUploadField field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  placeholder="Track title"
                  disabled={isLoading}
                  className="!bg-transparent"
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

        <FormField
          control={form.control}
          name="albums"
          render={({ field }) => (
            <FormItem className="h-full w-full">
              <FormLabel className="text-md font-semibold">Album</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  options={mockAlbums.map((album) => ({
                    value: album._id,
                    label: album.name,
                  }))}
                  placeholder="Select albums"
                  emptyIndicator={
                    <div className="flex items-center justify-center">
                      <ErrorMessage
                        message="No albums found."
                        severity="info"
                        variant="inline"
                        showIcon={false}
                      />
                    </div>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            disabled={isLoading}
          >
            {isLoading ? <LoaderSpin /> : "Upload"}
          </Button>
          <ConfirmDialog
            title="Confirm Upload"
            description={`Are you sure you want to upload this track? Please ensure all details are correct before proceeding.`}
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
export default UploadTrackForm;
