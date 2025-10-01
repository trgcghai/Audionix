import {
  ProfileFormValues,
  profileSchema,
} from "@/app/(user)/profile/components/form/schemas";
import useUserActions from "@/hooks/useUserActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseUserForm {
  user: {
    username: string;
  };
}

const useUserForm = ({ user }: UseUserForm) => {
  const { handleUpdateProfile, updateProfileState } = useUserActions();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
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
