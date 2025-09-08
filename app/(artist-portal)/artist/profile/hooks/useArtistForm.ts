import { ArtistFormValues } from "@/app/(artist-portal)/artist/profile/components/form/schemas";
import { Artist } from "@/app/types/model";
import { useForm } from "react-hook-form";

interface UseArtistFormProps {
  artist: Artist;
}

const useArtistForm = ({ artist }: UseArtistFormProps) => {
  const form = useForm<ArtistFormValues>({
    defaultValues: {
      name: artist.name,
      genres: artist.genres.map((genre) => ({
        label: genre.charAt(0).toUpperCase() + genre.slice(1),
        value: genre,
      })),
      cover_images: undefined,
    },
  });

  const onSubmit = async (data: ArtistFormValues) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
    isError: false,
    isLoading: false,
    error: null,
  };
};

export default useArtistForm;
