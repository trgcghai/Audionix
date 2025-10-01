"use client";
import UserForm from "@/app/(user)/profile/components/form/UserForm";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useGetUserByIdQuery } from "@/services/users/userApi";
import { useParams } from "next/navigation";

const AdminUpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, isError } = useGetUserByIdQuery(id, {
    skip: !id,
  });

  return (
    <div className="max-w-4xl mx-auto">
      {isLoading && <LoaderSpin />}
      {isError && (
        <ErrorMessage message={(error as ApiErrorResponse).data.message} />
      )}
      {data && <UserForm user={data?.data.item} />}
    </div>
  );
};
export default AdminUpdateUser;
