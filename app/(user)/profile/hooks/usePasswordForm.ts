import {
  PasswordFormValues,
  passwordSchema,
} from "@/app/(user)/profile/components/form/schemas";
import useUserActions from "@/hooks/useUserActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const usePasswordForm = () => {
  const { handleUpdatePassword, updatePasswordState } = useUserActions();
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    await handleUpdatePassword(data);
    form.reset();
  };

  return {
    form,
    onSubmit,
    isLoading: updatePasswordState.isLoading,
    isError: updatePasswordState.isError,
    error: updatePasswordState.error,
  };
};

export default usePasswordForm;
