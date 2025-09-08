"use client";
import usePlaylistForm from "@/app/(main)/playlists/hooks/usePlaylistForm";
import { ApiErrorResponse } from "@/app/types/api";
import { Playlist } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import ImageUpload from "@/components/form/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditPlaylistFormProps {
  data?: Playlist;
}

const EditPlaylistForm = ({ data }: EditPlaylistFormProps) => {
  const { error, form, isError, isLoading, onSubmit } = usePlaylistForm({
    data,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-3 grid-rows-4 gap-4"
      >
        {isError && (
          <div className="col-span-3 row-span-1">
            <ErrorMessage
              message={
                (error as ApiErrorResponse)?.data?.message ||
                "An error occurred while saving."
              }
            />
          </div>
        )}

        <div className="col-span-1 row-span-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                initialPreview={data?.cover_images[0]?.url || ""}
                disabled={isLoading}
                variant="playlist"
              />
            )}
          />
        </div>

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add a title"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 row-span-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add an optional description"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-3 flex items-center justify-end">
          <Button
            type="submit"
            className="min-w-[120px] rounded-full"
            disabled={isLoading}
          >
            {isLoading ? <LoaderSpin size="sm" /> : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditPlaylistForm;
