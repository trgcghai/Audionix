import {
  createAlbumFormValues,
  updateAlbumFormValues,
} from "@/app/(artist-portal)/artist/albums/components/form/schemas";
import useToast from "@/hooks/useToast";
import {
  useAddTracksToAlbumsMutation,
  useCreateAlbumMutation,
  useDeleteMultiplesMutation,
  useDeleteOneMutation,
  useRemoveTracksFromAlbumsMutation,
  useUpdateAlbumMutation,
  useUpdateStatusManyMutation,
  useUpdateStatusOneMutation,
} from "@/services/albums/albumApi";
import { usePathname } from "next/navigation";

const useAlbumActions = () => {
  const pathname = usePathname();
  const { showSuccessToast, showErrorToast } = useToast();
  const [createAlbum, createState] = useCreateAlbumMutation();
  const [deleteOne, deleteOneState] = useDeleteOneMutation();
  const [deleteMultiples, deleteMultiplesState] = useDeleteMultiplesMutation();
  const [updateStatusOne, updateStatusOneState] = useUpdateStatusOneMutation();
  const [updateStatusMany, updateStatusManyState] =
    useUpdateStatusManyMutation();

  const [addTracksToAlbums, addTracksToAlbumsState] =
    useAddTracksToAlbumsMutation();
  const [removeTracksFromAlbums, removeTracksFromAlbumsState] =
    useRemoveTracksFromAlbumsMutation();

  const [updateAlbum, updateAlbumState] = useUpdateAlbumMutation();

  const transformToPayload = (
    data: createAlbumFormValues | updateAlbumFormValues,
  ) => {
    const formData = new FormData();

    if (data.title) {
      formData.append("title", data.title);
    }

    formData.append("description", data.description || "");

    if (data.cover_image && data.cover_image.length > 0) {
      formData.append("cover_images", data.cover_image[0]);
    }

    if (data.genres && data.genres.length > 0) {
      formData.append(
        "genres",
        JSON.stringify(data.genres.map((genre) => genre.value)),
      );
    }

    return formData;
  };

  const getCurrentAlbumId = () => {
    // Hỗ trợ cả /artist/albums/update/:id (artist route)
    // và /admin/management/albums/update/:id (admin route)
    const match = pathname.match(
      /(?:artist|admin\/management)\/albums\/update\/([^/]+)/,
    );
    return match ? match[1] : "";
  };

  const handleCreateAlbum = async (data: createAlbumFormValues) => {
    try {
      const payload = transformToPayload(data);
      console.log("FormData:", Array.from(payload.entries()));

      await createAlbum(payload).unwrap();

      showSuccessToast("Album created successfully");
    } catch (err) {
      console.error("Error creating track:", err);
      showErrorToast("Failed to create album");
    }
  };

  const handleDeleteOne = async (id: string) => {
    try {
      await deleteOne(id).unwrap();
      showSuccessToast("Album deleted successfully");
    } catch (err) {
      console.error("Error deleting album:", err);
      showErrorToast("Failed to delete album");
    }
  };

  const handleDeleteMultiple = async (ids: string[]) => {
    try {
      await deleteMultiples(ids).unwrap();
      showSuccessToast("Albums deleted successfully");
    } catch (err) {
      console.error("Error deleting albums:", err);
      showErrorToast("Failed to delete albums");
    }
  };

  const handleUpdateStatusOne = async ({
    albumId,
    status,
  }: {
    albumId: string;
    status: string;
  }) => {
    try {
      await updateStatusOne({ albumId, status }).unwrap();
      showSuccessToast("Album status updated successfully");
    } catch (err) {
      console.error("Error updating album status:", err);
      showErrorToast("Failed to update album status");
    }
  };

  const handleUpdateStatusMany = async ({
    ids,
    status,
  }: {
    ids: string[];
    status: string;
  }) => {
    try {
      await updateStatusMany({ ids, status }).unwrap();
      showSuccessToast("Albums status updated successfully");
    } catch (err) {
      console.error("Error updating albums status:", err);
      showErrorToast("Failed to update albums status");
    }
  };

  const handleAddTracksToAlbums = async ({
    albumsIds,
    trackIds,
  }: {
    albumsIds: string[];
    trackIds: string[];
  }) => {
    try {
      if (albumsIds.length === 0 || trackIds.length === 0) return;

      await addTracksToAlbums({ albumIds: albumsIds, trackIds }).unwrap();
      showSuccessToast("Added tracks to albums successfully");
    } catch (error) {
      console.error("Failed to add tracks to albums:", error);
      showErrorToast("Failed to add tracks to albums");
    }
  };

  const handleRemoveTracksFromAlbums = async ({
    albumsIds,
    trackIds,
  }: {
    albumsIds: string[];
    trackIds: string[];
  }) => {
    try {
      if (albumsIds.length === 0 || trackIds.length === 0) return;

      await removeTracksFromAlbums({ albumIds: albumsIds, trackIds }).unwrap();
      showSuccessToast("Removed tracks from albums successfully");
    } catch (error) {
      console.error("Failed to remove tracks from albums:", error);
      showErrorToast("Failed to remove tracks from albums");
    }
  };

  const handleUpdateAlbum = async ({
    albumId,
    formData,
  }: {
    albumId: string;
    formData: updateAlbumFormValues;
  }) => {
    try {
      const data = transformToPayload(formData);
      await updateAlbum({ albumId, data }).unwrap();
      showSuccessToast("Album updated successfully");
    } catch (err) {
      console.error("Error updating album:", err);
      showErrorToast("Failed to update album");
    }
  };

  return {
    handleCreateAlbum,
    createState,
    handleDeleteOne,
    deleteOneState,
    handleDeleteMultiple,
    deleteMultiplesState,
    handleUpdateStatusOne,
    updateStatusOneState,
    handleUpdateStatusMany,
    updateStatusManyState,
    handleAddTracksToAlbums,
    addTracksToAlbumsState,
    handleRemoveTracksFromAlbums,
    removeTracksFromAlbumsState,
    handleUpdateAlbum,
    updateAlbumState,
    getCurrentAlbumId,
  };
};
export default useAlbumActions;
