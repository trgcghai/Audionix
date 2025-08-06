import {
  PlaylistFormSchema,
  PlaylistFormValues,
} from "@/app/(main)/playlists/schema";
import { Playlist } from "@/app/types/model";
import { useUpdatePlaylistMutation } from "@/services/playlists/playlistApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UsePlaylistFormProps {
  data?: Playlist;
}

const usePlaylistForm = ({ data }: UsePlaylistFormProps) => {
  const [updatePlaylist, { isLoading, isError, error }] =
    useUpdatePlaylistMutation();
  const form = useForm<PlaylistFormValues>({
    resolver: zodResolver(PlaylistFormSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  const transformToPayload = (formData: PlaylistFormValues): FormData => {
    const payload = new FormData();
    payload.append("title", formData.title);
    if (formData.description) {
      payload.append("description", formData.description);
    }
    if (formData.image) {
      payload.append("file", formData.image);
    }
    return payload;
  };

  const onSubmit = async (formData: PlaylistFormValues) => {
    if (!data?._id) {
      form.setError("root", { message: "Playlist ID is required" });
    }

    const payload = transformToPayload(formData);

    await updatePlaylist({
      id: data?._id as string,
      formData: payload,
    }).unwrap();
  };

  return {
    form,
    onSubmit,
    isLoading,
    isError,
    error,
  };
};
export default usePlaylistForm;
