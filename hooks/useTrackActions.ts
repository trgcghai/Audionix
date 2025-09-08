import { createTrackValues } from "@/app/(artist-portal)/artist/tracks/components/form/schemas";
import useToast from "@/hooks/useToast";
import {
  useChangeOneTrackStatusMutation,
  useChangeTracksStatusMutation,
  useCreateTrackMutation,
  useDeleteOneTrackMutation,
  useDeleteTracksMutation,
} from "@/services/tracks/trackApi";

const useTrackActions = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [createTrack, createState] = useCreateTrackMutation();
  const [deleteOneTrack, deleteOneState] = useDeleteOneTrackMutation();
  const [deleteTracks, deleteTracksState] = useDeleteTracksMutation();
  const [changeOneStatus, changeOneState] = useChangeOneTrackStatusMutation();
  const [changeMultipleStatus, changeMultipleState] =
    useChangeTracksStatusMutation();

  const transformToPayload = (data: createTrackValues) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.albums && data.albums.length > 0) {
      formData.append(
        "albumIds",
        JSON.stringify(data.albums.map((album) => album.value)),
      );
    }

    formData.append(
      "genres",
      JSON.stringify(data.genres.map((genre) => genre.value)),
    );

    formData.append("cover_image", data.cover_image[0]);

    formData.append("audio", data.audio[0]);

    return formData;
  };

  const handleCreateTrack = async (data: createTrackValues) => {
    try {
      const payload = transformToPayload(data);

      await createTrack(payload).unwrap();

      showSuccessToast("Track uploaded successfully!");
    } catch (err) {
      console.error("Error creating track:", err);
      showErrorToast("Upload track failed. Please try again.");
    }
  };

  const handleDeleteTracks = async (ids: string[]) => {
    try {
      await deleteTracks(ids).unwrap();
      showSuccessToast("Tracks deleted successfully!");
    } catch (err) {
      console.error("Error deleting tracks:", err);
      showErrorToast("Failed to delete tracks. Please try again.");
    }
  };

  const handleDeleteOne = async (trackId: string) => {
    try {
      await deleteOneTrack(trackId).unwrap();
      showSuccessToast("Track deleted successfully!");
    } catch (err) {
      console.error("Error deleting track:", err);
      showErrorToast("Failed to delete track. Please try again.");
    }
  };

  const handleChangeOneStatus = async ({
    trackId,
    status,
  }: {
    trackId: string;
    status: string;
  }) => {
    try {
      await changeOneStatus({ trackId, status }).unwrap();
      showSuccessToast("Track status changed successfully!");
    } catch (err) {
      console.error("Error changing track status:", err);
      showErrorToast("Failed to change track status. Please try again.");
    }
  };

  const handleChangeMultipleStatus = async ({
    ids,
    status,
  }: {
    ids: string[];
    status: string;
  }) => {
    try {
      await changeMultipleStatus({ ids, status }).unwrap();
      showSuccessToast("Tracks status changed successfully!");
    } catch (err) {
      console.error("Error changing tracks status:", err);
      showErrorToast("Failed to change tracks status. Please try again.");
    }
  };

  return {
    handleCreateTrack,
    createState,
    handleDeleteOne,
    deleteOneState,
    handleDeleteTracks,
    deleteTracksState,
    handleChangeOneStatus,
    changeOneState,
    handleChangeMultipleStatus,
    changeMultipleState,
  };
};
export default useTrackActions;
