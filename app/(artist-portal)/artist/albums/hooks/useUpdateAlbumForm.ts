import {
  updateAlbumFormValues,
  updateAlbumSchema,
} from "@/app/(artist-portal)/artist/albums/components/form/schemas";
import { Album } from "@/app/types/model";
import useAlbumActions from "@/hooks/useAlbumActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateAlbumFormProps {
  album: Album;
}

const useUpdateAlbumForm = ({ album }: UpdateAlbumFormProps) => {
  const { handleUpdateAlbum, updateAlbumState } = useAlbumActions();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<updateAlbumFormValues>({
    resolver: zodResolver(updateAlbumSchema),
    defaultValues: {
      title: album.title,
      description: album.description,
      genres: album.genres.map((genre) => ({
        label: genre.charAt(0).toUpperCase() + genre.slice(1),
        value: genre,
      })),
      cover_image: undefined,
    },
  });

  const handleSubmit = async (data: updateAlbumFormValues) => {
    try {
      await handleUpdateAlbum({ albumId: album._id, formData: data });
      form.resetField("cover_image");
    } catch (error) {
      console.error("Error creating album:", error);
    }

    setDialogOpen(false);
  };

  const handleReset = () => {
    setDialogOpen(false);
  };

  const openConfirmDialog = () => {
    setDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setDialogOpen(false);
  };

  return {
    form,
    dialogOpen,
    isLoading: updateAlbumState.isLoading,
    isError: updateAlbumState.isError,
    error: updateAlbumState.error,
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  };
};
export default useUpdateAlbumForm;
