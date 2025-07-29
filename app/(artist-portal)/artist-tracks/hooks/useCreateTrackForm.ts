import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  createTrackSchema,
  createTrackValues,
} from "../components/form/schemas";
import { TrackStatus } from "@/app/enums";

interface useCreateTrackFormProps {
  onSubmit?: (data: createTrackValues) => void;
}

export const useCreateTrackForm = ({ onSubmit }: useCreateTrackFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<createTrackValues>({
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: "",
      album: "",
      image: undefined,
      audioFile: undefined,
      status: TrackStatus.HIDDEN,
    },
  });

  const handleSubmit = (data: createTrackValues) => {
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
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  };
};
