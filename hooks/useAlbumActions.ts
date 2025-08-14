import { createAlbumFormValues } from "@/app/(artist-portal)/artist-albums/components/form/schemas";
import useToast from "@/hooks/useToast";
import { useCreateAlbumMutation } from "@/services/albums/albumApi";

const useAlbumActions = () => {
  const { showSuccessToast, showErrorToast } = useToast();
  const [createAlbum, createState] = useCreateAlbumMutation();

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

  return {
    handleCreateAlbum,
    createState,
  };
};
export default useAlbumActions;
