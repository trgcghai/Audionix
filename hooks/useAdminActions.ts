import { UserFormValues } from "@/app/(admin)/admin/management/users/components/form/schemas";
import useToast from "@/hooks/useToast";
import { useCreateUserMutation } from "@/services/users/userApi";

const useAdminActions = () => {
  const [createUser, createUserState] = useCreateUserMutation();
  const { showErrorToast, showSuccessToast } = useToast();

  const transformToPayload = (data: UserFormValues) => {
    const payload = new FormData();
    payload.append("username", data.username);
    payload.append("email", data.email);
    payload.append("password", data.password);
    payload.append("confirmPassword", data.confirmPassword);
    if (data.avatar) {
      payload.append("avatar", data.avatar);
    }
    return payload;
  };

  const handleCreateUser = async (userFormValues: UserFormValues) => {
    try {
      const formData = transformToPayload(userFormValues);
      await createUser(formData).unwrap();
      showSuccessToast("Creating user successfully");
    } catch (err) {
      console.log(err);
      showErrorToast("Failed to create user. Please try again later.");
    }
  };

  return {
    handleCreateUser,
    createUserState,
  };
};
export default useAdminActions;
