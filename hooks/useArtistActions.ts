import { ArtistFormValues } from "@/app/(artist-portal)/artist/profile/components/form/schemas";
import useToast from "@/hooks/useToast";
import { useUpdateMyArtistProfileMutation } from "@/services/artists/artistApi";

const useArtistActions = () => {
  const [updateMyArtistProfile, updateMyArtistState] =
    useUpdateMyArtistProfileMutation();
  const { showErrorToast, showSuccessToast } = useToast();

  const transformToPayload = (data: ArtistFormValues) => {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append(
      "genres",
      JSON.stringify(data.genres.map((genre) => genre.value)),
    );
    if (data.cover_images) {
      payload.append("cover_images", data.cover_images);
    }
    return payload;
  };

  const handleUpdateMyArtistProfile = async (formData: ArtistFormValues) => {
    try {
      const payload = transformToPayload(formData);
      await updateMyArtistProfile(payload).unwrap();
      showSuccessToast("Successfully updated profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showErrorToast("Failed to update profile. Please try again later.");
    }
  };

  return {
    handleUpdateMyArtistProfile,
    updateMyArtistState,
  };
};
export default useArtistActions;
