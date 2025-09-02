import { ProfileFormValues } from "@/app/(user)/profile/components/form/schema";
import useUserActions from "@/hooks/useUserActions";
import { useForm } from "react-hook-form";

interface UseUserForm {
  user: {
    username: string;
  };
}

const useUserForm = ({ user }: UseUserForm) => {
  const { handleUpdateProfile, updateProfileState } = useUserActions();
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      username: user.username,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    await handleUpdateProfile(data);
  };

  return {
    form,
    onSubmit,
    isError: updateProfileState.isError,
    isLoading: updateProfileState.isLoading,
    error: updateProfileState.error,
  };
};
export default useUserForm;
