"use client";
import {
  UserFormValues,
  userSchema,
} from "@/app/(admin)/admin/management/users/components/form/schemas";
import useAdminActions from "@/hooks/useAdminActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useAdminUserForm = () => {
  const { createUserState, handleCreateUser } = useAdminActions();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      avatar: undefined,
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    await handleCreateUser(data);
  };

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  return {
    form,
    onSubmit,
    isError: createUserState.isError,
    isLoading: createUserState.isLoading,
    error: createUserState.error,
    dialogOpen: confirmDialogOpen,
    setDialogOpen: setConfirmDialogOpen,
    openConfirmDialog,
    closeConfirmDialog,
  };
};
export default useAdminUserForm;
