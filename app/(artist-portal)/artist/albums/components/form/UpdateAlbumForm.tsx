"use client";
import useUpdateAlbumForm from "@/app/(artist-portal)/artist/albums/hooks/useUpdateAlbumForm";
import { DEFAULT_GENRES, MAX_GENRES } from "@/app/constant";
import { ApiErrorResponse } from "@/app/types/api";
import { Album } from "@/app/types/model";
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
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface UpdateAlbumFormProps {
  album: Album;
}

const UpdateAlbumForm = ({ album }: UpdateAlbumFormProps) => {
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
  } = useUpdateAlbumForm({ album });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label className="font-semibold">Current Cover Image</Label>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-center">
              <Image
                src={album.cover_images[0].url}
                alt={`${album.title} cover`}
                width={album.cover_images[0].width}
                height={album.cover_images[0].height}
                className="w-[300px] object-cover aspect-square rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="cover_image"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel className="font-semibold">New Cover Image</FormLabel>
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
                <FormLabel className="font-semibold">Title</FormLabel>
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
                <FormLabel className="font-semibold">Genres</FormLabel>
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
        </div>

        <div className="">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel className="font-semibold">Description</FormLabel>
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
              (error as unknown as ApiErrorResponse)?.data?.message ||
              "An error occurred while uploading the track."
            }
          />
        )}

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="destructive"
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
            {isLoading ? <LoaderSpin /> : "Save Changes"}
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
export default UpdateAlbumForm;
