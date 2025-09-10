import { ArtistFormValues } from "@/app/(artist-portal)/artist/profile/components/form/schemas";
import { useAppDispatch } from "@/hooks/redux";
import useToast from "@/hooks/useToast";
import {
  useCreateArtistProfileMutation,
  useUpdateMyArtistProfileMutation,
} from "@/services/artists/artistApi";
import { setUser, useUserSlice } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const useArtistActions = () => {
  const [updateMyArtistProfile, updateMyArtistState] =
    useUpdateMyArtistProfileMutation();
  const [createArtistProfile, createArtistState] =
    useCreateArtistProfileMutation();
  const { showErrorToast, showSuccessToast } = useToast();
  const { roles } = useUserSlice();
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleCreateArtistProfile = async (formData: ArtistFormValues) => {
    try {
      const payload = transformToPayload(formData);
      const data = await createArtistProfile(payload).unwrap();

      if (data.status === "success") {
        dispatch(
          setUser({
            roles: [...roles, "artist"],
          }),
        );
      }

      showSuccessToast("Successfully created profile");

      router.push("/artist");
    } catch (error) {
      console.error("Failed to create profile:", error);
      showErrorToast("Failed to create profile. Please try again later.");
    }
  };

  return {
    handleUpdateMyArtistProfile,
    updateMyArtistState,
    handleCreateArtistProfile,
    createArtistState,
  };
};
export default useArtistActions;
