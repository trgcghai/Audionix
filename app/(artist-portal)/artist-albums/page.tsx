"use client";
import { Columns } from "@/app/(artist-portal)/artist-albums/components/table/Columns";
import AlbumTable from "@/app/(artist-portal)/artist-albums/components/table";
import { useAppDispatch } from "@/hooks/redux";
import DetailAlbumCard from "@/components/common/DetailAlbumCard";
import { useEffect } from "react";
import {
  hideViewDetail,
  useDetailAlbumSlice,
} from "@/store/slices/detailAlbumSlice";
import LoaderSpin from "@/components/common/LoaderSpin";
import ErrorMessage from "@/components/common/ErrorMessage";
import { ApiErrorResponse } from "@/app/types/api";
import useAlbumManagement from "@/app/(artist-portal)/artist-albums/hooks/useAlbumManagement";

const ArtistAlbumPage = () => {
  const { album, isOpen } = useDetailAlbumSlice();
  const dispatch = useAppDispatch();
  const { albums, isLoading, isError, error } = useAlbumManagement();

  useEffect(() => {
    return () => {
      dispatch(hideViewDetail());
    };
  }, [dispatch]);

  return (
    <div className="h-full px-3">
      <div className="flex items-start gap-10">
        <div className={`${isOpen ? "w-3/5" : "w-full"}`}>
          <p className="mb-4 text-xl font-bold">Your albums</p>

          {isLoading && <LoaderSpin fullScreen />}
          {isError && (
            <ErrorMessage
              message={
                (error as ApiErrorResponse)?.message ||
                "An error occurred while fetching tracks data. Please try again later"
              }
            />
          )}
          <AlbumTable columns={Columns} data={albums} />
        </div>

        {isOpen && album && (
          <div className="w-2/5">
            <DetailAlbumCard album={album} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ArtistAlbumPage;
