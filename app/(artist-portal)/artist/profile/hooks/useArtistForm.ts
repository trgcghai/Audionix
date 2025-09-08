import { ArtistFormValues } from "@/app/(artist-portal)/artist/profile/components/form/schemas";
import { Artist } from "@/app/types/model";
import useArtistActions from "@/hooks/useArtistActions";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UseArtistFormProps {
  artist: Artist;
}

const useArtistForm = ({ artist }: UseArtistFormProps) => {
  const { handleUpdateMyArtistProfile, updateMyArtistState } =
    useArtistActions();
  const [dialogOpen, setDialogOpen] = useState(false);
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
    await handleUpdateMyArtistProfile(data);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  return {
    form,
    onSubmit,
    isError: updateMyArtistState.isError,
    isLoading: updateMyArtistState.isLoading,
    error: updateMyArtistState.error,

    dialogOpen,
    setDialogOpen,
    closeDialog,
    openDialog,
  };
};

export default useArtistForm;
