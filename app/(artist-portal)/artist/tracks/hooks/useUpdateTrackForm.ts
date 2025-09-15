import {
  createTrackSchema,
  createTrackValues,
} from "@/app/(artist-portal)/artist/tracks/components/form/schemas";
import { Track } from "@/app/types/model";
import useTrackActions from "@/hooks/useTrackActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface props {
  track: Track;
}

const useUpdateTrackForm = ({ track }: props) => {
  const { handleUpdateTrack, updateTrackState } = useTrackActions();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<createTrackValues>({
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: track.title,
      albums:
        track.albums.map((album) => ({
          label: album.title,
          value: album._id,
        })) || [],
      genres:
        track.genres.map((genre) => ({ label: genre, value: genre })) || [],
      cover_image: [new File([], track.cover_images[0].url)],
      audio: [new File([], track.file.url)],
    },
  });

  const handleSubmit = async (data: createTrackValues) => {
    try {
      await handleUpdateTrack({ trackId: track._id, data });
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
    isLoading: updateTrackState.isLoading,
    isError: updateTrackState.isError,
    error: updateTrackState.error,
    setDialogOpen,
    handleSubmit,
    handleReset,
    openConfirmDialog,
    closeConfirmDialog,
  };
};
export default useUpdateTrackForm;
