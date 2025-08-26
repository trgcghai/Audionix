import {
  PlaylistFormSchema,
  PlaylistFormValues,
} from "@/app/(main)/playlists/schema";
import { Playlist } from "@/app/types/model";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UsePlaylistFormProps {
  data?: Playlist;
}

const usePlaylistForm = ({ data }: UsePlaylistFormProps) => {
  const { handleUpdatePlaylist, updateState } = usePlaylistAction();
  const form = useForm<PlaylistFormValues>({
    resolver: zodResolver(PlaylistFormSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  const onSubmit = async (formData: PlaylistFormValues) => {
    if (!data?._id) {
      form.setError("root", { message: "Playlist ID is required" });
    }

    try {
      await handleUpdatePlaylist(data?._id as string, formData);
    } catch (error) {
      console.error("Failed to update playlist:", error);
      form.setError("root", { message: "Failed to update playlist" });
    }
  };

  return {
    form,
    onSubmit,
    isLoading: updateState.isLoading,
    isError: updateState.isError,
    error: updateState.error,
  };
};
export default usePlaylistForm;
