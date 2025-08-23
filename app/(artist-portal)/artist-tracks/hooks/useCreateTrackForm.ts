import useTrackActions from "@/hooks/useTrackActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createTrackSchema,
  createTrackValues,
} from "../components/form/schemas";

export const useCreateTrackForm = () => {
  const { handleCreateTrack, createState } = useTrackActions();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<createTrackValues>({
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: "",
      albums: [],
      genres: [],
      cover_image: undefined,
      audio: undefined,
    },
  });

  const handleSubmit = async (data: createTrackValues) => {
    try {
      await handleCreateTrack(data);
      form.reset();
    } catch (error) {
      console.error("Error creating track:", error);
    }

    setDialogOpen(false);

    form.reset({
      title: "",
      albums: [],
      genres: [],
      cover_image: undefined,
      audio: undefined,
    });
  };

  const handleReset = () => {
    form.reset({
      title: "",
      albums: [],
      genres: [],
      cover_image: undefined,
      audio: undefined,
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
