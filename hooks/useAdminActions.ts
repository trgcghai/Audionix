import { UserFormValues } from "@/app/(admin)/admin/management/users/components/form/schemas";
import { AccountStatus } from "@/app/enums";
import useToast from "@/hooks/useToast";
import {
  useActivateAccountsMutation,
  useDeactivateAccountsMutation,
} from "@/services/auth/authApi";
import { useCreateUserMutation } from "@/services/users/userApi";

const useAdminActions = () => {
  const [createUser, createUserState] = useCreateUserMutation();
  const [activateAccounts, activateAccountsState] =
    useActivateAccountsMutation();
  const [deactivateAccounts, deactivateAccountsState] =
    useDeactivateAccountsMutation();
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

  const handleToggleActiveStatus = async (
    accountIds: string[],
    status: AccountStatus,
  ) => {
    try {
      if (status === AccountStatus.DEACTIVATED) {
        await deactivateAccounts({ accountIds }).unwrap();
      } else if (status === AccountStatus.ACTIVATED) {
        await activateAccounts({ accountIds }).unwrap();
      }
      showSuccessToast("Activating accounts successfully");
    } catch (err) {
      console.log(err);
      showErrorToast(
        "Failed to update account status. Please try again later.",
      );
    }
  };

  return {
    handleCreateUser,
    createUserState,
    handleToggleActiveStatus,
    activateAccountsState,
    deactivateAccountsState,
  };
};
export default useAdminActions;
