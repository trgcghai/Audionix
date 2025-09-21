"use client";
import useAdminUserManagement from "@/app/(admin)/hooks/useAdminUserManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const UsersManagement = () => {
  const { users, getUserState } = useAdminUserManagement();

  console.log("users", users);

  return (
    <div className="h-full px-3">
      <div className="flex items-start gap-10">
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold capitalize">Users Management</p>

            <Button className="rounded-full">
              <Link
                href="/admin/management/users/create"
                className="flex gap-2 items-center"
              >
                <PlusIcon /> Add new
              </Link>
            </Button>
          </div>

          {getUserState.isLoading && <LoaderSpin fullScreen />}
          {getUserState.isError && (
            <ErrorMessage
              message={
                (getUserState.error as ApiErrorResponse)?.data?.message ||
                "An error occurred while fetching user data. Please try again later"
              }
            />
          )}
          {getUserState.isSuccess && (
            // <UserTable columns={AdminUserColumns} data={users} />
            <div>User table here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
