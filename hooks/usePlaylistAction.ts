import { PlaylistFormValues } from "@/app/(main)/playlists/schema";
import useToast from "@/hooks/useToast";
import {
  useAddTracksToPlaylistMutation,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useRemoveTracksFromPlaylistMutation,
  useUpdatePlaylistMutation,
} from "@/services/playlists/playlistApi";
import { usePathname, useRouter } from "next/navigation";

const usePlaylistAction = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [createPlaylist, createState] = useCreatePlaylistMutation();
  const [updatePlaylist, updateState] = useUpdatePlaylistMutation();
  const [deletePlaylist, deleteState] = useDeletePlaylistMutation();
  const [addTracksToPlaylist, addTracksState] =
    useAddTracksToPlaylistMutation();
  const [removeTracksFromPlaylist, removeTracksState] =
    useRemoveTracksFromPlaylistMutation();

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
      showSuccessToast("Created playlist successfully");
    } catch (error) {
      console.error("Failed to create playlist:", error);
      showErrorToast("Failed to create playlist");
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
      showSuccessToast("Updated playlist successfully");
    } catch (error) {
      console.error("Failed to update playlist:", error);
      showErrorToast("Failed to update playlist");
    }
  };

  const handleDeletePlaylist = async (id: string) => {
    if (!id) return;
    try {
      await deletePlaylist(id).unwrap();
      showSuccessToast("Deleted playlist successfully");

      router.push("/");
    } catch (error) {
      console.error("Failed to delete playlist:", error);
      showErrorToast("Failed to delete playlist");
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
      showSuccessToast("Added tracks to playlist successfully");
    } catch (error) {
      console.error("Failed to add tracks to playlist:", error);
      showErrorToast("Failed to add tracks to playlist");
    }
  };

  const handleRemoveTracksFromPlaylist = async ({
    id,
    trackIds,
  }: {
    id: string;
    trackIds: string[];
  }) => {
    if (!id || trackIds.length === 0) return;
    try {
      await removeTracksFromPlaylist({ id, trackIds }).unwrap();
      showSuccessToast("Removed tracks from playlist successfully");
    } catch (error) {
      console.error("Failed to remove tracks from playlist:", error);
      showErrorToast("Failed to remove tracks from playlist");
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
    handleRemoveTracksFromPlaylist,
    removeTracksState,
    getCurrrentPlaylistId,
  };
};
export default usePlaylistAction;
