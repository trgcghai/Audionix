import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArtistTrackItem } from "@/app/types/component";
import { useState } from "react";
import {
  createTrackSchema,
  createTrackValues,
} from "../components/form/schemas";

interface UseTrackFormProps {
  track?: ArtistTrackItem;
  onSubmit?: (data: createTrackValues) => void;
}

export const useTrackForm = ({ track, onSubmit }: UseTrackFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<createTrackValues>({
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: track?.name || "",
      album: track?.album?.id || "",
      image: track?.images[0]?.url
        ? new File([], track?.images[0].url)
        : undefined,
      audioFile: track?.href ? new File([], track.href) : undefined,
      status: track?.status || "inactive",
    },
  });

  const handleSubmit = (data: createTrackValues) => {
    console.log("Form submitted:", data);
    onSubmit?.(data);
    setDialogOpen(false);
  };

  const handleReset = () => {
    form.reset();
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
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
    isEditMode: !!track,
  };
};
