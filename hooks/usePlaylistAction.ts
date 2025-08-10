import { PlaylistFormValues } from "@/app/(main)/playlists/schema";
import useToast from "@/hooks/useToast";
import {
  useAddTracksToPlaylistMutation,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} from "@/services/playlists/playlistApi";
import { usePathname, useRouter } from "next/navigation";

const usePlaylistAction = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [createPlaylist, createState] = useCreatePlaylistMutation();
  const [updatePlaylist, updateState] = useUpdatePlaylistMutation();
  const [deletePlaylist, deleteState] = useDeletePlaylistMutation();
  const [addTracksToPlaylist, addTracksState] =
    useAddTracksToPlaylistMutation();

  const transformToUpdatePayload = (formData: PlaylistFormValues): FormData => {
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

  const handleCreatePlaylist = async () => {
    try {
      await createPlaylist().unwrap();
      showToast("Created playlist successfully", "success");
    } catch (error) {
      console.error("Failed to create playlist:", error);
      showToast("Failed to create playlist", "error");
    }
  };

  const handleUpdatePlaylist = async (
    id: string,
    formData: PlaylistFormValues,
  ) => {
    try {
      if (!id) return;
      const payload = transformToUpdatePayload(formData);

      await updatePlaylist({
        id,
        formData: payload,
      }).unwrap();
      showToast("Updated playlist successfully", "success");
    } catch (error) {
      console.error("Failed to update playlist:", error);
      showToast("Failed to update playlist", "error");
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    if (!id) return;
    try {
      await deletePlaylist(id).unwrap();
      showToast("Deleted playlist successfully", "success");

      router.push("/");
    } catch (error) {
      console.error("Failed to delete playlist:", error);
      showToast("Failed to delete playlist", "error");
    }
  };

  const handleAddTracksToPlaylist = async ({
    id,
    trackIds,
  }: {
    id: string;
    trackIds: string[];
  }) => {
    if (!id || trackIds.length === 0) return;
    try {
      await addTracksToPlaylist({ id, trackIds }).unwrap();
      showToast("Added tracks to playlist successfully", "success");
    } catch (error) {
      console.error("Failed to add tracks to playlist:", error);
      showToast("Failed to add tracks to playlist", "error");
    }
  };

  const getCurrrentPlaylistId = () => {
    const match = pathname.match(/playlists\/([^/]+)/);
    return match ? match[1] : "";
  };

  return {
    handleCreatePlaylist,
    createState,
    handleUpdatePlaylist,
    updateState,
    handleDeletePlaylist,
    deleteState,
    handleAddTracksToPlaylist,
    addTracksState,
    getCurrrentPlaylistId,
  };
};
export default usePlaylistAction;
