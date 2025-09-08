import useArtistForm from "@/app/(artist-portal)/artist/profile/hooks/useArtistForm";
import { DEFAULT_GENRES } from "@/app/constant";
import { Artist } from "@/app/types/model";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
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

interface ArtistFormProps {
  artist: Artist;
}

const ArtistForm = ({ artist }: ArtistFormProps) => {
  const { form, onSubmit, isError, error, isLoading } = useArtistForm({
    artist,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center items-center gap-6">
          <FormField
            control={form.control}
            name="cover_images"
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                initialPreview={
                  artist.cover_images ? artist.cover_images[0]?.url : ""
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
                  maxSelected={5}
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
            message={"An error occurred while updating."}
          />
        )}

        <div className="flex justify-end gap-2">
          <Button
            className="rounded-full"
            type="button"
            variant="destructive"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="min-w-32 rounded-full"
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
export default ArtistForm;
