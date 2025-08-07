import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  createTrackSchema,
  createTrackValues,
} from "../components/form/schemas";

interface useCreateTrackFormProps {
  onSubmit?: (data: createTrackValues) => void;
}

export const useCreateTrackForm = ({ onSubmit }: useCreateTrackFormProps) => {
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
    await onSubmit?.(data);
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
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  };
};
