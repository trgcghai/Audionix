import { createAlbumFormValues } from "@/app/(artist-portal)/artist/albums/components/form/schemas";
import useToast from "@/hooks/useToast";
import {
  useCreateAlbumMutation,
  useDeleteMultiplesMutation,
  useDeleteOneMutation,
  useUpdateStatusManyMutation,
  useUpdateStatusOneMutation,
} from "@/services/albums/albumApi";

const useAlbumActions = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [createAlbum, createState] = useCreateAlbumMutation();
  const [deleteOne, deleteOneState] = useDeleteOneMutation();
  const [deleteMultiples, deleteMultiplesState] = useDeleteMultiplesMutation();
  const [updateStatusOne, updateStatusOneState] = useUpdateStatusOneMutation();
  const [updateStatusMany, updateStatusManyState] =
    useUpdateStatusManyMutation();

  const transformToPayload = (data: createAlbumFormValues) => {
    const formData = new FormData();

    formData.append("title", data.title);

    formData.append("description", data.description || "");

    formData.append("cover_images", data.cover_image[0]);

    formData.append(
      "genres",
      JSON.stringify(data.genres.map((genre) => genre.value)),
    );

    return formData;
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
  };
};
export default useAlbumActions;
