import {
  createAlbumFormValues,
  createAlbumSchema,
} from "@/app/(artist-portal)/artist/albums/components/form/schemas";
import useAlbumActions from "@/hooks/useAlbumActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useCreateAlbumForm = () => {
  const { handleCreateAlbum, createState } = useAlbumActions();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<createAlbumFormValues>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      title: "",
      description: "",
      genres: [],
      cover_image: undefined,
    },
  });

  const handleSubmit = async (data: createAlbumFormValues) => {
    try {
      console.log(data);
      await handleCreateAlbum(data);
      form.reset();
    } catch (error) {
      console.error("Error creating album:", error);
    }

    setDialogOpen(false);

    form.reset({
      title: "",
      description: "",
      genres: [],
      cover_image: undefined,
    });
  };

  const handleReset = () => {
    form.reset({
      title: "",
      description: "",
      genres: [],
      cover_image: undefined,
    });
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
    isLoading: createState.isLoading,
    isError: createState.isError,
    error: createState.error,
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  };
};
export default useCreateAlbumForm;
