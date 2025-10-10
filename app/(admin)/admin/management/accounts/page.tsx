"use client";
import DetailAccountDialog from "@/app/(admin)/admin/management/accounts/components/detailAccountDialog";
import AdminAccountTable from "@/app/(admin)/admin/management/accounts/components/table";
import { AdminAccountColumns } from "@/app/(admin)/admin/management/accounts/components/table/Column";
import useAdminAccountManagement from "@/app/(admin)/hooks/useAdminAccountManagement";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideViewDetail,
  useDetailAccountSlice,
} from "@/store/slices/detailAccountSlice";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const AccountsManagement = () => {
  const { accounts, getUsersState } = useAdminAccountManagement();
  const { isOpen, account } = useDetailAccountSlice();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(hideViewDetail());
    };
  }, [dispatch]);

  return (
    <div className="h-full px-3">
      <div className="flex items-start gap-10">
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold capitalize">Accounts Management</p>

            <Button className="rounded-full">
              <Link
                href="/admin/management/accounts/create"
                className="flex gap-2 items-center"
              >
                <PlusIcon /> Add new
              </Link>
            </Button>
          </div>

          {getUsersState.isLoading && <LoaderSpin fullScreen />}
          {getUsersState.isError && (
            <ErrorMessage
              message={
                (getUsersState.error as ApiErrorResponse)?.data?.message ||
                "An error occurred while fetching account data. Please try again later"
              }
            />
          )}
          {getUsersState.isSuccess && (
            <AdminAccountTable columns={AdminAccountColumns} data={accounts} />
          )}
        </div>

        {isOpen && account && <DetailAccountDialog />}
      </div>
    </div>
  );
};
export default AccountsManagement;
