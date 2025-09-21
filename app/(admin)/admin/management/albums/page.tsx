"use client";
import AlbumTable from "@/app/(admin)/admin/management/albums/components/table";
import { AdminAlbumColumns } from "@/app/(admin)/admin/management/albums/components/table/Columns";
import useAdminAlbumManagement from "@/app/(admin)/hooks/useAdminAlbumManagement";
import DetailAlbumDialog from "@/app/(artist-portal)/artist/albums/components/DetailAlbumDialog";
import { ApiErrorResponse } from "@/app/types/api";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideViewDetail,
  useDetailAlbumSlice,
} from "@/store/slices/detailAlbumSlice";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const AlbumsManagement = () => {
  const { album } = useDetailAlbumSlice();
  const dispatch = useAppDispatch();
  const { albums, getAlbumState } = useAdminAlbumManagement();

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
            <p className="text-xl font-bold capitalize">Albums Management</p>

            <Button className="rounded-full">
              <Link
                href="/admin/management/albums/create"
                className="flex gap-2 items-center"
              >
                <PlusIcon /> Add new
              </Link>
            </Button>
          </div>

          {getAlbumState.isLoading && <LoaderSpin fullScreen />}
          {getAlbumState.isError && (
            <ErrorMessage
              message={
                (getAlbumState.error as ApiErrorResponse)?.data?.message ||
                "An error occurred while fetching album data. Please try again later"
              }
            />
          )}
          {getAlbumState.isSuccess && (
            <AlbumTable columns={AdminAlbumColumns} data={albums} />
          )}
        </div>

        {album && <DetailAlbumDialog />}
      </div>
    </div>
  );
};
export default AlbumsManagement;
