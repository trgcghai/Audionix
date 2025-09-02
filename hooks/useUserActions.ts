import { ProfileFormValues } from "@/app/(user)/profile/components/form/schema";
import useToast from "@/hooks/useToast";
import {
  useFollowAlbumMutation,
  useFollowArtistMutation,
  useUnfollowAlbumMutation,
  useUnfollowArtistMutation,
  useUpdateUserProfileMutation,
} from "@/services/users/userApi";

const useUserActions = () => {
  const [followArtist, followArtistState] = useFollowArtistMutation();
  const [unfollowArtist, unfollowArtistState] = useUnfollowArtistMutation();
  const [followAlbum, followAlbumState] = useFollowAlbumMutation();
  const [unfollowAlbum, unfollowAlbumState] = useUnfollowAlbumMutation();
  const [updateProfile, updateProfileState] = useUpdateUserProfileMutation();
  const { showErrorToast, showSuccessToast } = useToast();

  const transformToPayload = (formData: ProfileFormValues) => {
    const payload = new FormData();
    payload.append("username", formData.username);
    if (formData.avatar) {
      payload.append("avatar", formData.avatar);
    }
    return payload;
  };

  const handleFollowArtist = async (artistId: string) => {
    try {
      await followArtist(artistId).unwrap();
      showSuccessToast("Successfully followed artist");
    } catch (error) {
      console.error("Failed to follow artist:", error);
      showErrorToast("Failed to follow artist. Please try again later.");
    }
  };

  const handleUnfollowArtist = async (artistId: string) => {
    try {
      await unfollowArtist(artistId).unwrap();
      showSuccessToast("Successfully unfollowed artist");
    } catch (error) {
      console.error("Failed to unfollow artist:", error);
      showErrorToast("Failed to unfollow artist. Please try again later.");
    }
  };

  const handleFollowAlbum = async (albumId: string) => {
    try {
      await followAlbum(albumId).unwrap();
      showSuccessToast("Successfully followed album");
    } catch (error) {
      console.error("Failed to follow album:", error);
      showErrorToast("Failed to follow album. Please try again later.");
    }
  };

  const handleUnfollowAlbum = async (albumId: string) => {
    try {
      await unfollowAlbum(albumId).unwrap();
      showSuccessToast("Successfully unfollowed album");
    } catch (error) {
      console.error("Failed to unfollow album:", error);
      showErrorToast("Failed to unfollow album. Please try again later.");
    }
  };

  const handleUpdateProfile = async (formData: ProfileFormValues) => {
    try {
      const payload = transformToPayload(formData);
      await updateProfile(payload).unwrap();
      showSuccessToast("Successfully updated profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showErrorToast("Failed to update profile. Please try again later.");
    }
  };

  return {
    handleFollowArtist,
    followArtistState,
    handleUnfollowArtist,
    unfollowArtistState,
    handleFollowAlbum,
    followAlbumState,
    handleUnfollowAlbum,
    unfollowAlbumState,
    handleUpdateProfile,
    updateProfileState,
  };
};
export default useUserActions;
