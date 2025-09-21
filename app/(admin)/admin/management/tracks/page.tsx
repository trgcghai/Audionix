"use client";
import { AdminTrackTable } from "@/app/(admin)/admin/management/tracks/components/table";
import { AdminTrackColumns } from "@/app/(admin)/admin/management/tracks/components/table/Columns";
import useAdminTrackManagement from "@/app/(admin)/hooks/useAdminTrackManagement";
import DetailTrackDialog from "@/app/(artist-portal)/artist/tracks/components/DetailTrackDialog";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideViewDetail,
  setOpen,
  useDetailTrackSlice,
} from "@/store/slices/detailTrackSlice";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const TracksManagement = () => {
  const { tracks, isLoading, isError, error } = useAdminTrackManagement();
  const { isOpen, track } = useDetailTrackSlice();
  const dispatch = useAppDispatch();

  const setIsOpen = (isOpen: boolean) => {
    dispatch(setOpen({ isOpen }));
  };

  useEffect(() => {
    return () => {
      dispatch(hideViewDetail());
    };
  }, [dispatch]);

  return (
    <div className="px-3">
      <div className="mb-4 flex items-center justify-between">
        <p className=" text-xl font-bold">Tracks Management</p>

        <Button className="rounded-full">
          <Link
            className="flex items-center gap-2"
            href={"/admin/management/tracks/upload"}
          >
            <PlusIcon /> Add New
          </Link>
        </Button>
      </div>

      {isLoading && <LoaderSpin fullScreen />}
      {isError && (
        <ErrorMessage
          message={
            (error as ApiErrorResponse)?.data?.message ||
            "An error occurred while fetching tracks data. Please try again later"
          }
        />
      )}

      <AdminTrackTable columns={AdminTrackColumns} data={tracks} />

      {track && (
        <DetailTrackDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          track={track}
        />
      )}
    </div>
  );
};
export default TracksManagement;
